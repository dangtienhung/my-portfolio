import { useEffect, useState } from '../../../config/config';

import { getAll } from '../../../api/config-skill';

const SkillLayout = () => {
	useEffect(() => {
		// toggle educate
		const abc = document.querySelectorAll('.ac-header');
		const abcd = document.querySelectorAll('.ac-panel');
		abc.forEach((item, index) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				abcd[index].classList.toggle('hidden');
				item.classList.toggle('!bg-blue-500');
				item.classList.toggle('!text-black');
				if (!abcd[index].classList.contains('hidden')) {
					abcd[index].classList.remove('-translate-y-10');
				}
			});
		});
	});
	const [skills, setSkillLayouts] = useState([]);
	const [userInfo, setUserInfo] = useState([]);
	useEffect(() => {
		setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
		(async () => {
			try {
				const response = await getAll();
				if (response) {
					setSkillLayouts(response?.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='skills'>
      <h4 class="onscrool-text -translate-x-[150%] uppercase text-sm text-gray-400 transition-all duration-1000">MY SPECIALTY</h4>
      <h2 class='onscrool-text -translate-x-[150%] uppercase text-3xl font-medium mt-8 leading-10 transition-all duration-1000'>MY SKILLS</h2>
      <p class='onscrool-text -translate-x-[150%] mt-10 transition-all duration-1000'>${
				userInfo?.descriptionSkill?.replace(/[\r\n]/g, '<br/>') || ''
			}</p>
      <div class="mt-10 transition-all duration-500">
        ${skills
					.map((skill) => {
						return /* html */ `
            <div class="onscrool-text -translate-x-[150%] transition-all duration-1000 bg-white p-1 rounded-sm">
              <h2 class='ac-header !bg-blue-500 text-white text-base font-medium p-3 bg-gray-200 transition-all duration-300 rounded-sm cursor-pointer flex justify-between items-center'>
                <p class='font-semibold capitalize'>${skill.title}</p>
                <img src="/assets/images/exam-unscreen.gif" alt="" class='h-6 w-6 object-cover'/>
              </h2>
              <div class="ac-panel transition-all duration-1000 mt-1">
                <div class='border p-3'>
                  <p class='mt-2'>
                    ${skill.description.replace(/[\r\n]/g, '<br/>')}
                  </p>
                </div>
              </div>
            </div>
          `;
					})
					.join('')}
      </div>
    </section>
  `;
};

export default SkillLayout;
