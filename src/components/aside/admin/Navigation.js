import { router, useEffect, useState } from '../../../config/config';

const links = [
	{
		id: 1,
		title: 'Dashboard',
		to: '/admin/dashboard',
	},
	{
		id: 2,
		title: 'Quản lý dự án',
		to: '/admin/projects',
	},
	{
		id: 3,
		title: 'Thông tin người dùng',
		to: '/admin/user',
	},
];

const Navigation = () => {
	const [info, setInfo] = useState([]);
	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo === null || userInfo === undefined) {
			router.navigate('/admin/sign-in');
		} else {
			setInfo(userInfo);
		}
	}, []);
	useEffect(() => {
		const logout = document.querySelector('.logout');
		logout.addEventListener('click', (e) => {
			localStorage.setItem('userInfo', JSON.stringify({}));
			router.navigate('/admin/sign-in');
		});
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
	return /* html */ `
    <div class='fixed top-0 right-0 left-0 shadow-md p-6 bg-white flex justify-between items-center z-50'>
      <div class='p-2 bg-gray-200 xl:hidden block btn-modal'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <button><a href="/" class='xl:block hidden bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded'>Về trang chủ</a></button>
      <div class="flex gap-x-10">
        <button class='xl:inline-block hidden'>
          <a href="/admin/project/add-new" class="bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm dự án</a>
        </button>
        <div>
          <div class="relative group">
            <div class="h-16 w-16 rounded-full cursor-pointer">
              <img
                src="https://i.pinimg.com/236x/2a/94/4e/2a944e3ae3c301e49a20b803956f271f.jpg" alt=""
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <div
              class="absolute hidden p-2 group-hover:block rounded-lg bg-gray-200 shadow-md w-[200px] top-[calc(100%_+_8px)] right-0 after:absolute after:h-6 after:w-full after:-top-4"
            >
              <ul>
                <li><a href="/admin/user" class='p-2 inline-block w-full hover:bg-gray-300 rounded-md transition-all duration-200 cursor-pointer'>Thông tin người dùng</a></li>
                <li class='logout p-2 inline-block w-full hover:bg-gray-300 rounded-md transition-all duration-200 cursor-pointer'>Đăng xuất</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden modal-overlay bg-black z-50 inset-0 fixed opacity-40 transition-all duration-500 animate-aside-load"></div>
      <div class="hidden modal-active h-screen overflow-y-scroll fixed top-0 right-0 bottom-0 z-50 bg-white w-full max-w-xs p-[4%] transition-all duration-700 animate-aside-load">
        <div class="w-full min-h-screen">
          <div class='btn-close absolute top-2 left-2 rounded-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <section class='flex items-center justify-around h-[120px] mt-4 gap-x-4'>
            <img
              src="/assets/images/my.jpg"
              alt=""
              class='h-24 w-24 object-cover rounded-full'/>
            <div class='text-center capitalize'>
              <h2 class='text-black capitalize text-2xl'>Đặng tiến hưng</h2>
              <h4 class='text-blue-400 italic text-sm mt-2'>Front end developer</h4>
            </div>
          </section>
          <div class='w-full max-w-xs p-4 bg-lightMode shadow-lg h-full rounded-lg xl:hidden'>
            <div class="overflow-y-auto h-full -mr-4 pr-4">
            <ul>
            ${links
							.map(
								(link) => /* html */ `
                <li>
                  <a
                    href="${link.to}"
                    class='p-2 hover:bg-blue-400 transition-all duration-200 inline-block w-full rounded-lg hover:text-white mb-4' data-navigo
                  >
                    ${link.title}
                  </a>
                </li>
                `
							)
							.join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Navigation;
