import { AsideAdmin, Navigation } from '../../../components';

import { CategoryEditLayout } from '../../../components/layouts/admin';

const CategoryEdit = (params) => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex gap-x-4 justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${CategoryEditLayout(params)}
      </div>
    </div>
  `;
};

export default CategoryEdit;
