import {
	deleteProject,
	getAllProjects,
	getOneProject,
	searchProject,
} from '../../../../api/config-project';
import { router, useEffect, useState } from '../../../../config/config';

import Swal from 'sweetalert2';
import { getAllCategories } from '../../../../api/config-categories';

const ProjectLayout = () => {
	const itemsPerPage = 2;
	let currentPage = 1;
	const [paginate, setPaginate] = useState([]);
	const [projects, setProjects] = useState([]);
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const { data } = await getAllProjects();
	// 			if (data && data.length > 0) {
	// 				setProjects(data);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, []);
	useEffect(() => {
		const btnDelete = document.querySelectorAll('.btn-delete');
		if (btnDelete) {
			btnDelete.forEach((btn) => {
				btn.addEventListener('click', function (e) {
					const id = this.dataset.id;
					console.log('🚀 ~ file: ProjectLayout.js:28 ~ id', id);
					e.preventDefault();
					Swal.fire({
						title: 'Bạn có chắc chắn muốn xóa?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!',
					}).then((result) => {
						if (result.isConfirmed) {
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
							(async () => {
								try {
									const newProject = projects.filter((item) => item.id != id);
									await deleteProject(id);
									setProjects(newProject);
								} catch (error) {
									console.log(error);
								}
							})();
						}
					});
				});
			});
		}
	});
	useEffect(() => {
		const preview = document.querySelectorAll('.preview');
		preview.forEach((previewItem) => {
			previewItem.addEventListener('click', (e) => {
				const id = previewItem.dataset.id;
				window.location = `/project/${id}`;
			});
		});
	});
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
	const displayPagination = (totalPages) => {
		const paginate = document.querySelector('.paginate');
		paginate.innerHTML = '';
		let urls = [];
		for (let i = 0; i < totalPages; i++) {
			urls.push(i);
		}
		setPaginate(urls);
	};
	const fetchData = () => {
		fetch(
			`http://localhost:3000/projects?_page=${currentPage}&_limit=${itemsPerPage}`
		)
			.then((respon) => {
				const totalCount = respon.headers.get('X-Total-Count');
				const totalPage = Math.ceil(totalCount / itemsPerPage);
				displayPagination(totalPage);
				return respon.json();
			})
			.then((data) => {
				setProjects(data);
			});
	};
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		const btnPagination = document.querySelectorAll('.btn-pagination');
		btnPagination.forEach((paginate, index) => {
			paginate.addEventListener('click', (e) => {
				e.preventDefault();
				currentPage = index + 1;
				fetchData();
			});
		});
	});
	useEffect(async () => {
		try {
			const search = document.querySelector('.search');
			search.addEventListener('change', async () => {
				const respon = await searchProject(search.value);
				if (respon) {
					console.log(
						'🚀 ~ file: ProjectLayout.js:131 ~ search.addEventListener ~ respon:',
						respon
					);
					setProjects(respon.data);
				}
			});
		} catch (error) {
			console.log(error);
		}
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <div class='flex md:justify-end'>
        <button class='xl:hidden inline-block mb-4'>
          <a href="/admin/project/add-new" class="inline-block bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm dự án</a>
        </button>
        <input type="text" placeholder='Search...' class='search p-2 mb-5 rounded-sm outline-none w-full max-w-xs border border-gray-500'>
      </div>
      <div class="overflow-x-scroll rounded-lg bg-white shadow-md scroll-smooth">
        <table class='w-full'>
          <thead class='bg-[#f7f7f8]'>
            <tr>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Stt</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">tên dự án</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">github</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Link website</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">công nghệ</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">dang mục</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Mô tả dự án</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Active</th>
            </tr>
            </thead>
            <body>
            ${projects
							.map((project, index) => {
								const date = {
									dateStart: project?.dateStart.replace(/-/g, '/'),
									dateEnd: project?.dateEnd.replace(/-/g, '/'),
								};
								const titleCategory = categories.filter(
									(category) =>
										Number(category.id) === Number(project.categoryId)
								);
								return /* html */ `
                    <tr class='even:bg-lightMode'>
                      <td class="whitespace-nowrap py-4 px-7">
                        ${project.id}
                      </td>
                      <td class="block py-4 w-full min-w-[300px]">
                        <div class="flex items-center gap-x-3">
                          <img
                            src="${project.fileUrl[0]}"
                            alt="" class='w-[66px] h-[55px] rounded object-cover'>
                          <div class="flex-1">
                            <h3 class="font-semibold capitalize">${
															project.nameProject
														}</h3>
                            <time class="text-sm text-gray-500 inline-block">Date: ${
															date.dateStart
														} - ${date.dateEnd}</time>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-7 w-full min-w-[100px]">
                        <a
                          href="${project.linkProject}"
                        >
                          ${project.linkProject}
                        </a>
                      </td>
                      <td class="py-4 px-7 w-full min-w-[200px] inline-block">
                        <a
                          href="${project.linkWebsite || '#'}">
                          ${project.linkWebsite || 'Dự án chưa được deploy'}
                        </a>
                      </td>
                      <td class="whitespace-nowrap py-4 px-7">
                        <p>${project.techonology}</p>
                      </td>
                      <td class="whitespace-nowrap py-4 px-7">
                        <p>${titleCategory[0].title}</p>
                      </td>
                      <td class="py-4 px-2 w-full min-w-[300px] overflow-hidden !h-28">
                        <p class='overflow-y-auto w-full h-full'>${
													project.description
												}</p>
                      </td>
                      <td class='whitespace-nowrap py-4 px-7 !h-28 flex w-full gap-x-2 items-center'>
                        <div
                          class='preview h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'
                          data-id='${project.id}'
                          >
                          <img class='h-full w-full object-cover' src="/public/assets/images/project-active/scanning-unscreen.gif" alt="">
                        </div>
                        <div class='btn-edit h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'>
                          <a href="/admin/project/edit/${
														project.id
													}" class='inline-block'>
                            <img class='h-full w-full object-cover' src="/public/assets/images/project-active/edit-unscreen.gif" alt="">
                          </a>
                        </div>
                        <div
                          class='btn-delete h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'
                          data-id='${project.id}'
                          >
                          <img class='h-full w-full object-cover' src="/public/assets/images/project-active/bin-unscreen.gif" alt="">
                        </div>
                      </td>
                    </tr>
                  `;
							})
							.join('')}
          </body>
        </table>
      </div>
      <div class='my-8 text-center'>
        <ul class="inline-flex -space-x-px paginate">
          ${paginate
						.map((item) => {
							return /* html */ `
              <li>
                <a
                  href="${item + 1}"
                  class="btn-pagination px-3 mx-2 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ${item + 1}
                </a>
              </li>
            `;
						})
						.join('')}
        </ul>
      </div>
    </div>
  `;
};

export default ProjectLayout;
