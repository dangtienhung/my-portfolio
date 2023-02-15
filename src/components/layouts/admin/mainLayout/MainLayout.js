import AsideAdmin from '../../../aside/admin/AsideAdmin';
import Navigation from '../../../aside/admin/Navigation';

const MainLayout = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[120px] flex justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
      </div>
    </div>
  `;
};

export default MainLayout;
