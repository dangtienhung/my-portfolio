import { Aside, MainLayout } from '../../components';

import { useEffect } from '../../config/config';

const HomePage = () => {
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      ${MainLayout()}
    </div>
  `;
};

export default HomePage;
