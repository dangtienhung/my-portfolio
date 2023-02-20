import AsideAdmin from '../../../components/aside/admin/AsideAdmin';
import Navigation from '../../../components/aside/admin/Navigation';
import { UserEditPassword } from '../../../components/layouts/admin';

const UserEditPasswordPage = (params) => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class="mt-[124px] flex justify-between gap-x-4 bg-white px-4 my-4">
        ${AsideAdmin()}
        ${UserEditPassword(params)}
      </div>
    </div>
  `;
};

export default UserEditPasswordPage;
