import { Aside, MainLayout } from '../../components';

const HomePage = () => {
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      ${MainLayout()}
    </div>
  `;
};

export default HomePage;
