import 'toastify-js/src/toastify.css';

import { router, useEffect } from '../../../config/config';

import Toastify from 'toastify-js';
import { signUpUserInfo } from '../../../api/config-user-json';

const SignUpPage = () => {
	const handleCreateUser = async (data) => {
		try {
			await signUpUserInfo(data);
			Toastify({
				text: 'Đăng ký thành công!',
				duration: 3000,
				backgroundColor: 'rgb(59 130 246)',
			}).showToast();
			router.navigate('/admin/dashboard');
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const form = document.querySelector('.login-form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let email = form.elements.email.value;
			let password = form.elements.password.value;
			let confirmPassword = form.elements.confirmPassword.value;

			const regextEmail =
				/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			if (confirmPassword.trim() !== password.trim()) {
				Toastify({
					text: 'Mật khẩu xác nhận không đúng!',
					duration: 3000,
					backgroundColor: 'orange',
				}).showToast();
				return false;
			}
			if (password.trim().length < 6) {
				Toastify({
					text: 'Mật khẩu tối thiểu phải là 6 ký tự!',
					duration: 3000,
					backgroundColor: 'orange',
				}).showToast();
				return false;
			}
			if (
				email.trim() === '' ||
				password.trim() === '' ||
				confirmPassword.trim() === ''
			) {
				Toastify({
					text: 'Bạn đang để trống!',
					duration: 3000,
					backgroundColor: 'orange',
				}).showToast();
				return false;
			}
			if (
				regextEmail.test(email) &&
				confirmPassword.trim() === password.trim()
			) {
				const data = { email, password, createdAt: new Date() };
				handleCreateUser(data);
				window.location = '/admin/dashboard';
			} else {
				Toastify({
					text: 'Bạn nhập chưa đúng định dạng email!',
					duration: 3000,
					backgroundColor: 'orange',
				}).showToast();
				return false;
			}
		});
	});
	return /* html */ `
  <div
    style='background-image: url("/assets/images/login/bg-writting-cv.png")'
    class='bg-no-repeat bg-center bg-cover min-h-screen w-screen bg-opacity-50 flex items-center justify-center p-4 md:p-10 gap-x-10'
  >
    <div class="w-full h-full grid xl:grid-cols-2 grid-cols-1 gap-16 md:p-4 rounded-md">
      <div class='bg-white text-black bg-opacity-20 rounded-md w-full md:p-6 p-4 flex justify-center items-center flex-col'>
        <h1 class='text-3xl mb-10'>Register</h1>
        <form class='login-form w-full' autocomplete='off'>
          <div class='mb-4 relative w-full'>
            <input
              type="email" name="email" value="" placeholder='Email'
              class='bg-gray-300 focus:bg-white border focus:border-blue-400 p-2 rounded outline-none duration-300 transition-all w-full placeholder:text-gray-500'
            />
          </div>
          <div class='mb-4 relative w-full'>
            <input
              type="text" name="password" value="" placeholder='Password'
              class='bg-gray-300 focus:bg-white border focus:border-blue-400 p-2 rounded outline-none duration-300 transition-all w-full placeholder:text-gray-500'
            />
          </div>
          <div class='mb-4 relative w-full'>
            <input
              type="text" name="confirmPassword" value="" placeholder='Confirm Password'
              class='bg-gray-300 focus:bg-white border focus:border-blue-400 p-2 rounded outline-none duration-300 transition-all w-full placeholder:text-gray-500'
            />
          </div>
          <button class='p-2 rounded bg-blue-500 text-white w-full'>Register</button>
        </form>
        <p class='capitalize text-black cursor-pointer hover:text-blue-900 mt-10'>forgot password?</p>
        <p class='capitalize text-black mt-2'>I have an account? <a href="/admin/sign-in" data-navigo class='capitalize cursor-pointer text-blue-900 mt-10'>Sign in</a></p>
      </div>
      <div class='flex items-center justify-center flex-col h-full w-full'>
        <div class='flex gap-x-4'>
          <img
            src="/public/assets/images/login/resume__1_-removebg-preview.png"
            alt=""
            class='h-10 w-10 object-cover'
          />
          <h1 class='capitalize text-4xl'>My Portfolio Creator</h1>
        </div>
        <p class='mt-10 md:w-1/2 w-3/2 mx-auto text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tempore id consequatur, minus quae necessitatibus veritatis pariatur. Incidunt optio velit aliquid voluptas quae quos quo! Fuga dolorem porro necessitatibus quis!</p>
        <a href="/admin/sign-in" data-navigo class='mt-10 inline-block py-2 px-8 rounded bg-blue-500 text-white capitalize text-base'>Login</a>
      </div>
    </div>
  </div>
  `;
};

export default SignUpPage;
