import { AsideAdmin, Navigation } from '../../../components';

import { UserLayout } from '../../../components/layouts/admin';

const UserPage = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class="mt-[124px] flex justify-between gap-x-4 bg-white px-4 my-4">
        ${AsideAdmin()}
        ${UserLayout()}
      </div>
    </div>
  `;
};

export default UserPage;
