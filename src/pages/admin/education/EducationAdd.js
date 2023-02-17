import { AsideAdmin, Navigation } from '../../../components';

import { EducateAddNew } from '../../../components/layouts/admin';

const EducationAdd = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${EducateAddNew()}
      </div>
    </div>
  `;
};

export default EducationAdd;
