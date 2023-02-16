import AboutUs from '../layouts/aboutUs/AboutUs';
import ContactLayout from '../layouts/contact/ContactLayout';
import Education from '../layouts/education/Education';
import ExperienceLayout from '../layouts/experience/ExperienceLayout';
import HomeLayout from '../layouts/home/HomeLayout';
import SkillLayout from '../layouts/skill/SkillLayout';
import { useEffect } from '../../config/config';

const MainLayout = () => {
	useEffect(() => {
		const navLinks = document.querySelector('.nav__links');
		navLinks.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.classList.contains('nav__link')) {
				const id = e.target.getAttribute('href');
				document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
				console.log(
					'🚀 ~ file: Aside.js:38 ~ navLinks.addEventListener ~ document.querySelector(id)',
					document.querySelector(id)
				);
			}
		});
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
