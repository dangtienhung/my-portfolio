import { AsideAdmin, Navigation } from '../../../components';

import { SkillAddLayout } from '../../../components/layouts/admin';

const SkillAddPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${SkillAddLayout()}
      </div>
    </div>
  `;
};

export default SkillAddPage;
