import AboutUs from '../layouts/aboutUs/AboutUs';
import ContactLayout from '../layouts/contact/ContactLayout';
import Education from '../layouts/education/Education';
import ExperienceLayout from '../layouts/experience/ExperienceLayout';
import HomeLayout from '../layouts/home/HomeLayout';
import SkillLayout from '../layouts/skill/SkillLayout';
import { useEffect } from '../../config/config';

const MainLayout = () => {
	useEffect(() => {
		/* download cv */
		// const downloadCv = document.querySelector('.download-cv');
		// downloadCv.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	const link = document.createElement('a');
		// 	link.href = '/public/cv/Lab8.pdf';
		// 	link.download = 'Lap8.pdf';
		// 	document.body.appendChild(link);
		// 	link.click();
		// 	document.body.remove(link);
		// 	router.navigate('/');
		// });
	});
	return /* html */ `
    <div class='flex-1 bg-white'>
      <div class="h-screen xl:overflow-y-scroll">
        <div class='flex overflow-x-auto justify-end flex-col'>
          ${HomeLayout()}
          ${AboutUs()}
          ${Education()}
          ${SkillLayout()}
          ${ExperienceLayout()}
          ${ContactLayout()}
        </div>
      </div>
    </div>
  `;
};

export default MainLayout;
