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

	return /* html */ `
    <div class='flex-1 bg-white'>
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
            <div class='rounded-lg overflow-hidden'>
              <img
                src="${project?.fileUrl}"
                alt="${project?.nameProject}"
                class='rounded-lg w-full h-[300px] object-cover'
              />
            </div>
          </div>
          <div class='mt-12'>
            <p>${
							project?.description
						} Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo exercitationem dolores iusto autem sequi? A qui voluptatem ducimus est asperiores, magnam, unde ipsa possimus aliquam, ipsum eum nostrum at nesciunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consequatur repellendus officia, sit sint modi! Fugit sint cumque ipsam aut autem, quos iure adipisci animi molestiae, architecto accusamus corrupti aspernatur. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et sit illum adipisci minima voluptates corporis nemo deleniti, fuga nulla molestiae repellat, explicabo commodi temporibus ab voluptas! Cum, dolorem mollitia! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id dicta enim quas aperiam mollitia quisquam blanditiis minima quod incidunt quidem nobis autem natus quis perferendis dolores consequuntur, accusantium est sapiente!</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ProjectLayout;
