import { AsideAdmin, Navigation } from '../../../components';

import { CategoriesLayout } from '../../../components/layouts/admin';

const Categories = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex gap-x-4 justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${CategoriesLayout()}
      </div>
    </div>
  `;
};

export default Categories;
