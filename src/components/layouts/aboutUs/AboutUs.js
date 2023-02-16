import { useEffect } from '../../../config/config';

const AboutUs = () => {
	useEffect(() => {
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
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='about'>
      <h4 class="uppercase text-sm text-gray-400 transition-all duration-500">About us</h4>
      <h2 class='uppercase text-3xl font-medium mt-8 transition-all duration-700'>who am i?</h2>
      <div class='mt-20'>
        <p class='transition-all duration-1000'>
          <span class="font-semibold">Đặng Tiến Hưng</span>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex quod beatae maxime quaerat. Ad, tempora? Adipisci quae autem aperiam consectetur fugiat, ratione tempore harum fugit eveniet modi sed quo molestiae soluta atque possimus. Tempore eveniet nemo quis voluptatum accusantium! Nam, fugiat? Soluta, commodi rerum facere totam reiciendis, at libero eligendi ea fugiat minima, quibusdam inventore quam! Quisquam repellendus, architecto veritatis tenetur molestias nobis quo quibusdam corporis adipisci doloribus? Laboriosam sed voluptate sit recusandae et quasi. Asperiores modi necessitatibus velit aut?</span>
        </p>
        <p class='mt-4 transition-all duration-1000'>
          <span class='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, eveniet adipisci impedit quos, sit debitis eligendi quasi consectetur minima velit accusamus vel voluptatum cupiditate aliquid earum quod ea inventore optio dignissimos recusandae voluptate deleniti iusto, fugiat vitae. Quo, dolore nulla.</span>
        </p>
      </div>
      <div class="xl:mt-16 mt-12 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12">
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
