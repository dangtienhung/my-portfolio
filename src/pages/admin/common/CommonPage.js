import { AsideAdmin, Navigation } from '../../../components';

import { CommonLayout } from '../../../components/layouts/admin';

const CommonPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex gap-x-4 justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${CommonLayout()}
      </div>
    </div>
  `;
};

export default CommonPage;
