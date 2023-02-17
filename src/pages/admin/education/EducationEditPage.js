import { AsideAdmin, Navigation } from '../../../components';

import { EducateEdit } from '../../../components/layouts/admin';

const EducationEditPage = (params) => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${EducateEdit(params)}
      </div>
    </div>
  `;
};

export default EducationEditPage;
