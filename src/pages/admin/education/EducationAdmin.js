import { AsideAdmin, Navigation } from '../../../components';

import { EducationAdminLayout } from '../../../components/layouts/admin';

const EducationAdmin = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${EducationAdminLayout()}
      </div>
    </div>
  `;
};

export default EducationAdmin;
