import { useEffect, useState } from '../../../config/config';

const AboutUs = () => {
	const [userInfo, setUserInfo] = useState([]);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('userInfo'));
		setUserInfo(data);
	}, []);
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='about'>
      <h4 class="uppercase text-sm text-gray-400 transition-all duration-500 onscrool-text -translate-x-[150%]">About us</h4>
      <h2 class='uppercase text-3xl font-medium mt-8 transition-all duration-700 onscrool-text -translate-x-[150%]'>who am i?</h2>
      <div class='mt-20'>
        <p class='transition-all duration-1000 onscrool-text -translate-x-[150%]'>
          <span class="font-semibold capitalize">${userInfo?.username}</span>
        </p>
        <p class='mt-4 transition-all duration-1000 onscrool-text -translate-x-[150%]'>
          <span class='mt-4'>${
						userInfo?.descriptionInfo?.replace(/[\r\n]/g, '<br/>') ||
						/* html */ `<div class='h-10 w-10 rounded-full border-4 border-blue-500 border-t-4 border-t-transparent animate-spin'></div>`
					}</span>
        </p>
      </div>
      <div class='grid xl:grid-cols-2 grid-cols-1 gap-10 mt-10'>
        <h2>
          <span class='font-semibold'>Email</span>
          <span class='font-normal'>${userInfo?.email}</span>
        </h2>
        <h2 class='capitalize font-semibold'>
          <span class='font-semibold'>Phone:</span>
          <span class='font-normal'>${userInfo?.phone}</span>
        </h2>
        <h2 class='capitalize font-semibold'>
          <span class='font-semibold'>birthday:</span>
          <span class='font-normal'>${userInfo?.birthday}</span>
        </h2>
        <h2 class='capitalize font-semibold'>
          <span class='font-semibold'>Address:</span>
          <span class='font-normal'>${userInfo?.address}</span>
        </h2>
        <h2 class='font-semibold'>
          <span class='capitalize font-semibold'>facebook:</span>
          <span class='font-normal'>
            <a href="${userInfo?.facebook}">
              ${userInfo?.facebook}
            </a>
          </span>
        </h2>
        <h2 class='font-semibold'>
          <span class='capitalize font-semibold'>github:</span>
          <span class='font-normal'>
            <a href="${userInfo?.github}" target="_blank">
              ${userInfo?.github}
            </a>
          </span>
        </h2>
      </div>
      <div class="xl:mt-16 mt-12 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 transition-all duration-1000">
        <div class='ct-about-skill !border-b-blue-600'>
          <a href="/skills" className="inline-block">
            <img src="/assets/images/idea.gif" alt="" class='h-10 w-10'/>
            <p class='font-semibold my-4'>Web Design</p>
          </a>
        </div>
        <div class='ct-about-skill !border-b-red-600'>
          <a href="/skills" className="inline-block">
            <img src="/assets/images/monitor.gif" alt="" class='h-10 w-10'/>
            <p class='font-semibold my-4'>UI/UX Design</p>
          </a>
        </div>
      </div>
    </section>
  `;
};

export default AboutUs;
