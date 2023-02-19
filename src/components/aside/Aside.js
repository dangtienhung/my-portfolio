import { useEffect, useState } from '../../config/config';

import { avatarDefault } from '../../config/config';
import { getUserInfo } from '../../api/config-user-json';

const links = [
	{
		name: 'home',
		to: '/',
	},
	{
		name: 'about',
		to: '/about',
	},
	{
		name: 'education',
		to: '/education',
	},
	{
		name: 'skills',
		to: '/skills',
	},
	{
		name: 'experience',
		to: '/experience',
	},
	{
		name: 'contact',
		to: '/contact',
	},
];

const Aside = () => {
	useEffect(() => {
		const text = document.querySelector('.text-load');
		if (text) {
			const textLoad = () => {
				setTimeout(() => {
					text.textContent = 'hung';
				}, 0);
				setTimeout(() => {
					text.textContent = `${userInfoData.apply?.split(' ')[0]}`;
				}, 4000);
			};
			textLoad();
			setInterval(textLoad, 4000);
		}
		const isElInViewPort = (el) => {
			let rect = el.getBoundingClientRect();
			let viewHeight =
				window.innerHeight || document.documentElement.clientHeight;
			return (
				(rect.top <= 0 && rect.bottom >= 0) ||
				(rect.bottom >= viewHeight && rect.top <= viewHeight) ||
				(rect.top >= 0 && rect.bottom <= viewHeight)
			);
		};
		const elToShow = document.querySelectorAll('.onscrool-text');
		function loop() {
			elToShow.forEach((item) => {
				if (isElInViewPort(item)) {
					item.classList.remove('-translate-x-[150%]');
					item.classList.remove('translate-y-[200px]');
				} else {
					item.classList.add('-translate-x-[150%]');
					item.classList.add('translate-y-[200px]');
				}
			});
		}
		window.onscroll = loop;
		loop();
	});
	useEffect(() => {
		const OpenModal = document.querySelector('.btn-modal');
		const ModalOverlay = document.querySelector('.modal-overlay');
		const CloseModal = document.querySelector('.btn-close');
		const handleToggle = () => {
			OpenModal.classList.toggle('active');
		};
		CloseModal?.addEventListener('click', handleToggle);
		OpenModal?.addEventListener('click', handleToggle);
		ModalOverlay?.addEventListener('click', handleToggle);
	});
	const [userInfoData, setUserInfoData] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const respon = await getUserInfo(1);
				setUserInfoData(respon.data);
				localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return /* html */ `
  <div class='w-full max-w-[300px] hidden lg:block'>
		<div class='w-full px-4 bg-lightMode min-h-screen'>
			<div class='overflow-y-auto h-screen -mr-4 pr-4'>
				<section class='flex flex-col items-center justify-around h-[284px] mt-4'>
					<img
						src="${userInfoData?.avatar}"
						alt=""
						class='h-40 w-40 object-cover rounded-full'/>
					<div class='text-center capitalize'>
						<h2 class='text-black capitalize text-2xl'>${
							userInfoData?.username || 'Đặng hưng'
						}</h2>
						<h4 class='text-blue-400 italic text-sm mt-2'>${userInfoData.apply}</h4>
					</div>
				</section>
				<nav class='mt-4'>
					<ul class='text-center nav__links'>
						${
							links &&
							links.length > 0 &&
							links
								.map(
									(link) => /* html */ `
								<li>
                  <a
                    href="${link.to}"
                    id='${link.name}' class='nav__link ct-header-link' data-navigo
                  >
                    ${link.name}
                  </a>
                </li>
						`
								)
								.join('')
						}
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<div class="btn-modal !z-[1000] fixed bg-white top-4 right-4 rounded-sm hover:bg-gray-800 hover:opacity-50 xl:hidden">
		<div class='p-2 bg-gray-200'>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		</div>
	</div>
	<div class="modal-overlay hidden bg-black z-50 inset-0 fixed opacity-40 transition-all duration-500 animate-aside-load"></div>
	<div class="modal-active hidden h-screen overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 bg-white w-full max-w-xs p-[4%] transition-all duration-700 animate-aside-load">
		<div class="w-full min-h-screen">
      <div class='btn-close absolute top-2 right-2 rounded-sm'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <section class='flex flex-col items-center justify-around h-[284px] mt-4'>
        <img
          src="/assets/images/my.jpg"
          alt=""
          class='h-40 w-40 object-cover rounded-full'/>
        <div class='text-center capitalize'>
          <h2 class='text-black capitalize text-2xl'>Đặng tiến hưng</h2>
          <h4 class='text-blue-400 italic text-sm mt-2'>Front end developer</h4>
        </div>
      </section>
      <nav class='mt-4'>
        <ul class='text-center'>
          ${
						links &&
						links.length > 0 &&
						links
							.map(
								(link) => /* html */ `
              <li><a href="${link.to}" class='ct-header-link'>${link.name}</a></li>
          `
							)
							.join('')
					}
        </ul>
      </nav>
    </div>
	</div>
  `;
};

export default Aside;
