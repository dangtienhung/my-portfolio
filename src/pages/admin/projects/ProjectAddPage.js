import { AsideAdmin, Navigation } from '../../../components';

import { ProjectAddLayout } from '../../../components/layouts/admin';

const ProjectAddPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${ProjectAddLayout()}
      </div>
    </div>
  `;
};

export default ProjectAddPage;
