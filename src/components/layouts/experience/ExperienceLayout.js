import { useEffect, useState } from '../../../config/config';

import axios from 'axios';
import { getAllProjects } from '../../../api/config-project';

const ExperienceLayout = ({ categories }) => {
	const [projects, setProjects] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	const [paginate, setPaginate] = useState([]);
	const itemsPerPage = 4;
	let currentPage = 1;
	// useEffect(() => {
	// 	setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
	// 	(async () => {
	// 		try {
	// 			const { data } = await getAllProjects();
	// 			setProjects(data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	})();
	// }, []);
	const displayPagination = (totalPages) => {
		const paginate = document.querySelector('.paginate');
		paginate.innerHTML = '';
		let urls = [];
		for (let i = 0; i < totalPages; i++) {
			urls.push(i);
		}
		setPaginate(urls);
	};
	const fetchData = async () => {
		fetch(
			`http://localhost:3000/projects?_page=${currentPage}&_limit=${itemsPerPage}`
		)
			.then((res) => {
				const totalCount = res.headers.get('X-Total-Count');
				const totalPage = Math.ceil(totalCount / itemsPerPage);
				displayPagination(totalPage);
				return res.json();
			})
			.then((data) => setProjects(data));
	};
	useEffect(() => {
		setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
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
	useEffect(() => {
		const btns = document.querySelectorAll('.btn-handle');
		for (const btn of btns) {
			btn.addEventListener('click', () => {
				const id = btn.dataset.id;
				(async () => {
					const res = await axios.get(
						`http://localhost:3000/categories/${id}?_embed=projects`
					);
					if (res && res.data) {
						setProjects(res.data.projects);
					}
				})();
			});
		}
	});
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='experience'>
      <h4 class="onscrool-text -translate-x-[150%] uppercase text-sm text-gray-400 transition-all duration-1000">EXPERIENCE</h4>
      <h2 class='onscrool-text -translate-x-[150%] uppercase text-3xl font-medium mt-8 leading-10 transition-all duration-1000'>WORK EXPERIENCE</h2>
      <p class='onscrool-text -translate-x-[150%] mt-10 transition-all duration-1000'>
        ${userInfo?.descriptionExerience?.replace(/[\r\n]/g, '<br/>' || '')}
      </p>
      <div class='mb-10 flex mt-10'>
        ${categories
					.map((category) => {
						return /* html */ `
              <div
                data-id='${category.id}'
                class='btn-handle py-2 px-6 rounded-sm text-xl bg-gray-100 inline-block border-b-2 border-r-2 cursor-pointer !last-child:border-r-0'>
                <p class='capitalize'>${category.title}</p>
              </div>
            `;
					})
					.join('')}
      </div>
      <div class="onscrool-text -translate-x-[150%] grid grid-cols-2 gap-10 mt-12">
        ${projects
					?.map((project) => {
						const date = {
							dateStart: project?.dateStart.replace(/-/g, '/'),
							dateEnd: project?.dateEnd.replace(/-/g, '/'),
						};
						const techonology = project?.techonology.split(', ');
						return /* html */ `
            <div class="w-full rounded-lg overflow-hidden group bg-gray-200">
              <a href="/project/${project?.id}" class='inline-block w-full'>
                <img src="${project?.fileUrl[0]}" alt="${
							project?.nameProject
						}" class='w-full h-[250px] object-cover rounded-lg'>
              </a>
              <div class='px-4 pb-4 flex flex-col'>
                <div class="flex-1">
                  <div>
                    ${techonology
											.map(
												(item) => /* html */ `
                      <div class="mt-6 py-1 px-2 inline-block rounded bg-blue-500 text-white font-semibold">${item}</div>
                    `
											)
											.join('')}
                  </div>
                  <h2 class="capitalize mt-4 text-2xl font-semibold">
                    <a href="/project/${project?.id}">${
							project?.nameProject
						}</a>
                  </h2>
                  <time class="text-sm text-gray-500 inline-block">Date:
                    ${date.dateStart} - ${date.dateEnd}
                  </time>
                  <p class='pt-2 flex gap-x-1 mt-auto'>Github:
                    <a href="${project?.linkProject}" target="_blank">${
							project?.linkProject
						}</a></p>
                  <p class='pt-2'>Website:
                    <a href="${project?.linkWebsite}" target="_blank">${
							project?.linkWebsite || 'D??? ??n n??y ch??a ???????c deploy'
						}</a></p>
                </div>
              </div>
            </div>
          `;
					})
					.join('')}
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
    </section>
  `;
};

export default ExperienceLayout;
