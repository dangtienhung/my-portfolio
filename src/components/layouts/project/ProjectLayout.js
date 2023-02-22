import { useEffect, useState } from '../../../config/config';

import axios from 'axios';
import { getAllCategories } from '../../../api/config-categories';
import { getOneProject } from '../../../api/config-project';

const ProjectLayout = (params) => {
	const {
		data: { idProject },
	} = params;
	const [project, setProject] = useState([]);
	const [categories, setCategories] = useState([]);
	const [relatedProjects, setRelatedProjects] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getOneProject(idProject);
				const res = await getAllCategories();
				setProject(data);
				setCategories(res.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
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
			$('.multiple-items').slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
			});
		});
	});
	useEffect(async () => {
		try {
			const responIdCategory = await axios.get(
				`http://localhost:3000/projects/1?_expand=category`
			);
			if (responIdCategory && responIdCategory.data?.category?.id) {
				const respon = await axios.get(
					`http://localhost:3000/categories/2?_embed=projects`
				);
				if (respon && respon.data?.projects) {
					const projects = respon.data?.projects;
					const newProject = projects.filter(
						(project) => Number(project.id) !== Number(idProject)
					);
					setRelatedProjects(newProject);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
	return /* html */ `
    <div class='flex-1 bg-gray-50'>
      <div class="h-screen xl:overflow-y-scroll">
        <div class='flex overflow-x-auto justify-end flex-col relative min-h-screen w-full px-[4%] py-16'>
          <div class='z-10 grid grid-cols-2 gap-x-10'>
            <div>
              <h2><span class='capitalize font-semibold text-4xl'>${
								project?.nameProject
							}</span></h2>
              <p class='text-gray-500 mt-6 italic'>
                ${project?.dateStart?.replace(
									/-/g,
									'/'
								)} - ${project?.dateEnd?.replace(/-/g, '/')}
              </p>
              <p class='flex gap-x-2 mt-6'>
                <span>Github:</span>
                <span class='text-base'>
                  <a
                    href="${project?.linkProject}"
                    class='text-blue-500'
                  >${project?.linkProject}</a>
                </span>
              </p>
              <p class='flex gap-x-2 mt-6'>
                <span class='capitalize'>website:</span>
                <span class='text-base'>
                  <a
                    href="${project?.linkWebsite}"
                    class='text-blue-500'
                  >${project?.linkWebsite}</a>
                </span>
              </p>
              <p class='flex gap-x-2 mt-6'>
                <span class='capitalize'>Công nghệ sử dụng:</span>
                <span class='text-base capitalize'>
                  ${project?.techonology}
                </span>
              </p>
            </div>
            <div class='slider overflow-hidden bg-gray-100 p-4'>
              <div class="slider-for mb-10 shadow-lg w-full">
                ${project?.fileUrl
									?.map((image) => {
										return /* html */ `
                  <div>
                    <img src="${image}" class='block max-w-full h-auto' alt="${image}">
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
          <div class='mt-12'>
            <h1 class="capitalize text-2xl font-semibold mb-4">Mô tả dự án</h1>
            <p>${project?.description?.replace(/[\r\n]/g, '<br/>')}</p>
          </div>
          <div class="mt-12">
            <h1 class="capitalize text-2xl font-semibold mb-4">Dự án khác</h1>
            <div class='grid grid-cols-3 gap-10'>
              ${relatedProjects
								.map((project) => {
									const date = {
										dateStart: project?.dateStart.replace(/-/g, '/'),
										dateEnd: project?.dateEnd.replace(/-/g, '/'),
									};
									const techonology = project?.techonology.split(', ');
									return /* html */ `
                  <div class='flex flex-col overflow-hidden bg-gray-300 rounded'>
                    <a
                      href="/project/${project?.id}"
                      class='inline-block w-full'
                    >
                      <img
                        src="${project?.fileUrl[0]}"
                        alt="${project?.nameProject}"
                        class='w-full h-[250px] object-cover rounded-lg'
                      />
                    </a>
                    <div class='px-4 pb-4 flex flex-col'>
                      <div class="flex-1">
                        <div>
                          ${techonology
														.map(
															(item) => /* html */ `
                            <div
                              class="mt-6 py-1 px-2 inline-block rounded bg-blue-500 text-white font-semibold"
                            >
                              ${item}
                            </div>`
														)
														.join('')}
                        </div>
                        <h2 class="capitalize mt-4 text-2xl font-semibold">
                          <a href="/project/${project?.id}">
                            ${project?.nameProject}
                          </a>
                        </h2>
                        <time class="text-sm text-gray-500 inline-block">
                          Date:
                          ${date.dateStart} - ${date.dateEnd}
                        </time>
                        <p class='pt-2 flex gap-x-1 mt-auto'>
                          Github:
                          <a href="${project?.linkProject}"
                            target="_blank">
                            ${project?.linkProject}
                          </a>
                        </p>
                        <p class='pt-2'>
                          Website:
                          <a
                            href="${project?.linkWebsite}" target="_blank">
                          ${
														project?.linkWebsite || 'Dự án này chưa được deploy'
													}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                `;
								})
								.join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ProjectLayout;
