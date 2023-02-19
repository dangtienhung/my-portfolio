import { AsideAdmin, Navigation } from '../../../components';

import { CategoryAddNew } from '../../../components/layouts/admin';

const CategoryAdd = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex gap-x-4 justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${CategoryAddNew()}
      </div>
    </div>
  `;
};

export default CategoryAdd;
