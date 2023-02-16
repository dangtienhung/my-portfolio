import { getOneProject, updateProject } from '../../../../api/config-project';
import { router, useEffect, useState } from '../../../../config/config';

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
	console.log(
		'🚀 ~ file: ProjectEditLayout.js:10 ~ ProjectEditLayout ~ project',
		project
	);
	useEffect(() => {
		const form = document.querySelector('#form');
		let image = document.querySelector('#image');
		let file,
			fileUrl = '';
		image.addEventListener('change', (e) => {
			file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				fileUrl = reader.result;
				console.log(
					'🚀 ~ file: ProjectEditLayout.js:34 ~ image.addEventListener ~ fileUrl',
					fileUrl
				);
			};
		});
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let nameProject = document.querySelector('#name').value;
			let urlLinkProject = document.querySelector('.urlLinkProject').src;
			if (fileUrl === '') {
				fileUrl = urlLinkProject;
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
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <h1 class="text-2xl font-semibold mb-10">Sửa dự án: ${project?.nameProject}</h1>
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
              type="text" name="" id="techonology" value='${project?.techonology}'
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
            <input type="file" name="" id="image" class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'>
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>hoặc giữ lại hình ảnh cũ</label>
            <div class="group cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full h-[200px] rounded-lg relative overflow-hidden z-0">
              <img src="${project?.fileUrl}" alt="" class='w-full h-full object-cover urlLinkProject'>
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
