import { router, useEffect, useState } from '../../../config/config';

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
	console.log('🚀 ~ file: Navigation.js:5 ~ Navigation ~ info', info);
	return /* html */ `
    <div class='fixed top-0 right-0 left-0 shadow-md p-6 bg-white flex justify-between items-center z-50'>
      <button><a href="/" class='bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded'>Về trang chủ</a></button>
      <div class="flex gap-x-10">
        <button>
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
    </div>
  `;
};

export default Navigation;
