import { useEffect } from '../../../config/config';

const HomeLayout = () => {
	return /* html */ `
  <section class='w-full relative slider-item duration-1000 transition-all' id='home'>
    <div class="slider-main" style='transition: transform 0.25s linear;'>
      <div class="select-none">
        <div class='grid lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-14'>
          <div></div>
          <img src="/assets/images/zalo1-removebg.png"
            alt=""
            class='w-full h-screen object-cover'
          />
        </div>
        <section class='absolute inset-0 bg-black opacity-50 text-white'></section>
        <section class='absolute text-white inset-0 z-10 p-[4%] grid lg:grid-cols-1 xl:grid-cols-2'>
          <div class='flex justify-center flex-col'>
            <h2 class='text-4xl lg:text-6xl whitespace-nowrap lg:whitespace-normal hidden xl:block'>
              <p class='sm:inline-block lg:block'>Hi!</p>
              <p class='sm:inline-block lg:block hidden'>
                <span>I'm</span>
                <span class='text-load text-blue-500 capitalize relative test'>tien hung</span>
              </p>
            </h2>
            <h2 class='onscrool-text transition-all duration-1000 -translate-x-[150%] text-4xl lg:text-6xl whitespace-nowrap lg:whitespace-normal xl:hidden'>
              <p class='sm:inline-block lg:block'>Hi!</p>
              <p class='sm:inline-block lg:block hidden'>
                <span>I'm</span>
                <span class='text-load text-blue-500 capitalize relative'>hung</span>
              </p>
            </h2>
            <span class='onscrool-text -translate-x-[150%] text-sm mt-4 whitespace-normal transition-all duration-1000'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur illum praesentium porro?</span>
            <a href='/assets/cv/Lap8.pdf' download class="download-cv onscrool-text duration-700 -translate-x-[150%] rounded-sm uppercase mt-12 max-w-[180px] border border-white p-2 flex justify-center items-center gap-x-2 bg-white text-black lg:opacity-30 hover:opacity-100 transition">
              <span>download cv</span>
              <img
                src="/assets/images/download.gif"
                alt=""
                class="h-6 w-6 object-cover"
              />
            </a>
            </div>
        </section>
      </div>
    </div>
  </section>
  `;
};

export default HomeLayout;
