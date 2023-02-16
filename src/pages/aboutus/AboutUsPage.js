import { AboutUs, Aside } from '../../components';

const AboutUsPage = () => {
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      <div class='flex-1 bg-white'>
        <div class="h-screen xl:overflow-y-scroll">
          <div class='flex overflow-x-auto justify-end flex-col'>
            ${AboutUs()}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default AboutUsPage;
