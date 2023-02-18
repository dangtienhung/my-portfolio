import { AsideAdmin, Navigation } from '../../../components';

import { SkillLayoutAdmin } from '../../../components/layouts/admin';

const SkillPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between gap-x-6 bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${SkillLayoutAdmin()}
      </div>
    </div>
  `;
};

export default SkillPage;
