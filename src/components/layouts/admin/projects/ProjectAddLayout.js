import 'toastify-js/src/toastify.css';

import * as Yup from 'yup';

import {
	COULD_NAME,
	PRESET_NAME,
	router,
	useEffect,
	useState,
} from '../../../../config/config';

import Toastify from 'toastify-js';
import { addProject } from '../../../../api/config-project';
import axios from 'axios';
import { getAllCategories } from '../../../../api/config-categories';

const schema = Yup.object({
	username: Yup.string().required('Vui lòng nhập tên dự án'),
	linkGithub: Yup.string().required('Vui lòng nhập link github'),
	image: Yup.mixed().required('Vui lòng chọn ảnh'),
	description: Yup.string().required('Vui lòng mô tả dự án của bạn'),
	techonology: Yup.string().required(
		'Công nghệ bạn sử dụng trong dự án này là gì'
	),
});

const ProjectAddLayout = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const res = await getAllCategories();
				if (res && res.data) {
					setCategories(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	useEffect(() => {
		const form = document.querySelector('#form');
		const uploadAvatar = async (files) => {
			if (files) {
				const folder_name = 'portfolio';
				const api = `https://api.cloudinary.com/v1_1/${COULD_NAME}/image/upload`;
				const urls = [];
				const formData = new FormData();

				formData.append('upload_preset', PRESET_NAME);
				formData.append('folder', folder_name);

				for (const file of files) {
					formData.append('file', file);
					const res = await axios.post(api, formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					urls.push(res.data.secure_url);
				}
				return urls;
			}
		};
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			let image = document.querySelector('#image');
			let nameProject = document.querySelector('#name').value;
			let linkProject = document.querySelector('#link').value;
			let dateStart = document.querySelector('#date-start').value;
			let dateEnd = document.querySelector('#date-end').value;
			let techonology = document.querySelector('#techonology').value;
			let categoryId = document.querySelector('#category').value;
			categoryId = Number(categoryId);
			let description = document.querySelector('#description').value;
			let linkWebsite = document.querySelector('#linkWebsite').value;
			const urls = await uploadAvatar(image.files);
			if (
				nameProject.trim() === '' ||
				linkProject.trim() === '' ||
				linkWebsite.trim() === '' ||
				dateStart.trim() === '' ||
				dateEnd.trim() === '' ||
				description.trim() === ''
			) {
				Toastify({
					text: 'Bạn không được để trống',
					style: {
						background: 'linear-gradient(to right, #FF9966, #FF9966)',
					},
					duration: 3000,
				}).showToast();
				return false;
			}
			if (urls.length === 0) {
				Toastify({
					text: 'Bạn chưa có hình ảnh',
					style: {
						background: 'linear-gradient(to right, #FF9966, #FF9966)',
					},
					duration: 3000,
				}).showToast();
				return false;
			}
			const data = {
				nameProject,
				linkProject,
				dateStart,
				dateEnd,
				techonology,
				categoryId,
				description,
				linkWebsite,
				fileUrl: urls,
			};
			console.log(
				'🚀 ~ file: ProjectAddLayout.js:78 ~ form.addEventListener ~ data:',
				data
			);
			(async () => {
				try {
					await addProject(data);
					Toastify({
						text: 'Thêm danh mục thành công!',
						style: {
							background: 'linear-gradient(to right, #00b09b, #96c93d)',
						},
						position: 'left',
						duration: 3000,
					}).showToast();
					window.location = '/admin/projects';
				} catch (error) {
					console.log(error);
				}
			})();
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <h1 class="text-2xl font-semibold mb-10">Thêm dự án mới</h1>
      <form autocomplete='off' id='form'>
        <div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Tên dự án</label>
            <input
              type="text" name="username" id="name"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Tên dự án'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>link dự án</label>
            <input
              type="text" name="linkGithub" id="link"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Link dự án'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>link website</label>
            <input
              type="text" name="linkWebsite" id="linkWebsite"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Link Website'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian bắt đầu</label>
            <input
              type="date" name="dateStart" id="date-start"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian kết thúc</label>
            <input
              type="date" name="dateEnd" id="date-end"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Công nghệ sử dụng</label>
            <input
              type="text" name="techonology" id="techonology"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Công nghệ sử dụng'
            />
          </div>
        </div>
        <div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>category</label>
            <select name="category" id="category" class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none">
              ${categories
								.map((category) => {
									return /* html */ `
                  <option value="${category.id}">${category.title}</option>;
                `;
								})
								.join('')}
            </select>
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>hình ảnh mô tả dự án</label>
            <input type="file" name="image" id="image" multiple class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'>
          </div>
        </div>
        <div class="grid grid-cols-1 mb-10">
          <textarea
            name="description" id="description" cols="30" rows="5" placeholder='Mô tả dự án'
            class="border resize-none border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'
          ></textarea>
        </div>
        <div class="text-center">
          <button type='submit' class="bg-blue-500 rounded-md text-white py-2 w-full max-w-[200px]">Thêm dự án</button>
        </div>
      </form>
    </div>
  `;
};

export default ProjectAddLayout;
