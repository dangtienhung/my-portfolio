import { AsideAdmin, Navigation } from '../../../components';

import { DashboardLayout } from '../../../components/layouts/admin';

const Dashboard = () => {
	return /* html */ `
    <div class="flex flex-col">
      ${Navigation()}
      <div class='mt-[124px] flex justify-between bg-white px-4 my-4'>
        ${AsideAdmin()}
        ${DashboardLayout()}
      </div>
    </div>
  `;
};

export default Dashboard;
