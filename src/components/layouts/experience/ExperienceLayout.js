import { useEffect, useState } from '../../../config/config';

import { getAllProjects } from '../../../api/config-project';

const ExperienceLayout = () => {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllProjects();
				setProjects(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='experience'>
      <h4 class="onscrool-text -translate-x-[150%] uppercase text-sm text-gray-400 transition-all duration-1000">EXPERIENCE</h4>
      <h2 class='onscrool-text -translate-x-[150%] uppercase text-3xl font-medium mt-8 leading-10 transition-all duration-1000'>WORK EXPERIENCE</h2>
      <p class='onscrool-text -translate-x-[150%] mt-10 transition-all duration-1000'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae voluptate rerum aperiam officiis delectus, animi optio qui dolorum hic eligendi nulla adipisci! Nulla possimus cumque quisquam porro facilis inventore sunt.</p>
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
							project?.linkWebsite || 'Dự án này chưa được deploy'
						}</a></p>
                </div>
              </div>
            </div>
          `;
					})
					.join('')}
    </section>
  `;
};

export default ExperienceLayout;
