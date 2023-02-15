import { AsideAdmin, Navigation } from '../../../components';

import { ProjectLayout } from '../../../components/layouts/admin';

const ProjectAdminPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${ProjectLayout()}
      </div>
    </div>
  `;
};

export default ProjectAdminPage;
