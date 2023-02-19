import { useEffect, useState } from '../../../config/config';

import { getOneProject } from '../../../api/config-project';

const ProjectLayout = (params) => {
	const {
		data: { idProject },
	} = params;
	const [project, setProject] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getOneProject(idProject);
				setProject(data);
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
		});
	});
	return /* html */ `
    <div class='flex-1 bg-gray-50'>
      <div class="h-screen xl:overflow-y-scroll">
        <div class='flex overflow-x-auto justify-end flex-col relative min-h-screen w-full px-[4%] py-20'>
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
            <p>${project?.description?.replace(/[\r\n]/g, '<br/>')}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ProjectLayout;
