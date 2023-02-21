import { useEffect, useState } from '../../../config/config';

import { getAll } from '../../../api/config-education';

const Education = () => {
	useEffect(() => {
		// toggle educate
		const abc = document.querySelectorAll('.ac-header');
		const abcd = document.querySelectorAll('.ac-panel');
		abc.forEach((item, index) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				abcd[index].classList.toggle('hidden');
				item.classList.toggle('!bg-blue-500');
				item.classList.toggle('!text-white');
				if (!abcd[index].classList.contains('hidden')) {
					abcd[index].classList.remove('-translate-y-10');
				}
			});
		});
	});
	const [userInfo, setUserInfo] = useState([]);
	const [educate, setEducate] = useState([]);
	useEffect(() => {
		setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
		(async () => {
			try {
				const response = await getAll();
				if (response) {
					setEducate(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='education'>
      <h4 class="onscrool-text -translate-x-[150%] uppercase text-sm text-gray-400 transition-all duration-1000">Education</h4>
      <h2 class='onscrool-text -translate-x-[150%] uppercase text-3xl font-medium mt-8 leading-10 transition-all duration-1000'>MY EDUCATION</h2>
      <p class='onscrool-text -translate-x-[150%] mt-10 transition-all duration-1000'>
        ${userInfo?.descriptionEducation || ''}
      </p>
      <div class="mt-10 transition-all duration-500">
        ${educate.map((educa) => {
					const date = {
						dateStart: educa?.dateStart.replace(/-/g, '/'),
						dateEnd: educa?.dateEnd.replace(/-/g, '/'),
					};
					return /* html */ `
            <div class="onscrool-text -translate-x-[150%] transition-all duration-1000 bg-white p-1 rounded-sm">
              <h2 class='ac-header text-base font-medium p-3 bg-gray-200 transition-all duration-300 rounded-sm cursor-pointer flex justify-between items-center'>
                <p class='font-semibold capitalize'>${educa.school}</p>
                <img src="/assets/images/exam-unscreen.gif" alt="" class='h-6 w-6 object-cover'/>
              </h2>
              <div class="ac-panel transition-all duration-1000 mt-1">
                <div class='border p-3'>
                  <time class="text-sm text-gray-500 inline-block">
                    Date: ${date.dateStart} - ${date.dateEnd}
                  </time>
                  <p class="mt-3">Chuyên ngành: ${educa.industry}</p>
                  <p class='mt-2'>${educa.message}</p>
                </div>
              </div>
            </div>
          `;
				})}
      </div>
    </section>
  `;
};

export default Education;
