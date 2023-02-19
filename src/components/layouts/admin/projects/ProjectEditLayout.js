import 'toastify-js/src/toastify.css';

import {
	COULD_NAME,
	PRESET_NAME,
	router,
	useEffect,
	useState,
} from '../../../../config/config';
import { getOneProject, updateProject } from '../../../../api/config-project';

import Toastify from 'toastify-js';
import axios from 'axios';

const ProjectEditLayout = (params) => {
	const {
		data: { idProject },
	} = params;
	const [project, setProject] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getOneProject(idProject);
				data ? setProject(data) : [];
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	const handleImage = async (files) => {
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
	useEffect(() => {
		const form = document.querySelector('#form');
		let image = document.querySelector('#image');
		let fileUrl = '';
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			let nameProject = document.querySelector('#name').value;
			fileUrl = await handleImage(image.files);
			if (fileUrl.length === 0) {
				fileUrl = project.fileUrl;
			}
			let linkProject = document.querySelector('#link').value;
			let dateStart = document.querySelector('#date-start').value;
			let dateEnd = document.querySelector('#date-end').value;
			let techonology = document.querySelector('#techonology').value;
			let category = document.querySelector('#category').value;
			let description = document.querySelector('#description').value;
			let linkWebsite = document.querySelector('#linkWebsite').value;

			const data = {
				id: idProject,
				nameProject,
				linkProject,
				dateStart,
				dateEnd,
				techonology,
				category,
				description,
				fileUrl,
				linkWebsite,
			};
			(async () => {
				try {
					await updateProject(data);
					router.navigate('/admin/projects');
					Toastify({
						text: 'Sửa dự án thành công!',
						duration: 3000,
						position: 'top-center',
						backgroundColor: 'rgb(59 130 246)',
					}).showToast();
					window.location = '/admin/projects';
				} catch (error) {
					console.log(error);
				}
			})();
		});
	});
	useEffect(() => {
		$(document).ready(function () {
			// Initialize slick slider for main slider
			$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav',
			});

			// Initialize slick slider for navigation slider
			$('.slider-nav').slick({
				autoplay: true,
				autoplaySpeed: 3000,
				slidesToShow: 4,
				slidesToScroll: 1,
				asNavFor: '.slider-for',
				dots: false,
				centerMode: false,
				focusOnSelect: true,
			});
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <h1 class="text-2xl font-semibold mb-10">Sửa dự án: ${
				project?.nameProject
			}</h1>
      <form autocomplete='off' id='form'>
        <div class="grid grid-cols-2 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Tên dự án</label>
            <input
              type="text" name="" id="name" value='${project?.nameProject}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Tên dự án'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>link dự án</label>
            <input
              type="text" name="" id="link" value='${project?.linkProject}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Link dự án'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>link website</label>
            <input
              type="text" name="" id="linkWebsite"
                value='${project?.linkWebsite}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Link Website'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian bắt đầu</label>
            <input
              type="date" name="" id="date-start" value='${project.dateStart}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian kết thúc</label>
            <input
              type="date" name="" id="date-end" value='${project.dateEnd}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Công nghệ sử dụng</label>
            <input
              type="text" name="" id="techonology"
              value='${project?.techonology}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Công nghệ sử dụng'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>category</label>
            <input
              type="text" name="" id="category" value='${project?.category}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Category'
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>hình ảnh tô tả dự án</label>
            <input type="file" name="" id="image" multiple class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'>
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>hoặc giữ lại hình ảnh cũ</label>
            <div class="group cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full h-full rounded-lg relative overflow-hidden z-0">
              <div class='slider overflow-hidden bg-gray-100 p-4'>
                <div class="slider-for mb-10 shadow-lg w-full h-[200px]">
                  ${project?.fileUrl
										?.map((image) => {
											return /* html */ `
                    <div>
                      <img src="${image}" class='block max-w-full h-full object-cover' alt="${image}">
                    </div>
                    `;
										})
										.join('')}
                </div>
                <div class="slider-nav text-center">
                  ${project?.fileUrl
										?.map((image) => {
											return /* html */ `
                    <div>
                      <img src="${image}" class='inline-block mx-4 shadow max-w-full h-auto border-2 border-solid border-white cursor-pointer opacity-50 hover:opacity-100' alt="${image}">
                    </div>
                    `;
										})
										.join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 mb-10">
          <label for="" class='capitalize'>Mô tả dự án</label>
          <textarea
            name="description" id="description" cols="30" rows="5" placeholder='Mô tả dự án'
            class="border resize-none border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'
          >${project?.description}</textarea>
        </div>
        <div class="text-center">
          <button class="bg-blue-500 rounded-md text-white py-2 w-full max-w-[200px] capitalize">sửa dự án</button>
        </div>
      </form>
    </div>
  `;
};

export default ProjectEditLayout;
