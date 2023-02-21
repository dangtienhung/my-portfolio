import 'toastify-js/src/toastify.css';

import * as Yup from 'yup';

import {
	serviceEmailId,
	templateEmailId,
	useEffect,
	useState,
} from '../../../config/config';

import Toastify from 'toastify-js';
import emailjs from '@emailjs/browser';

const schema = Yup.object({
	username: Yup.string().required('Vui lòng nhập tên của bạn'),
	email: Yup.string()
		.email('Vui lòng nhập địa chỉ email hợp lệ')
		.required('Vui lòng nhập địa chỉ email'),
	message: Yup.string().required('Không được để trống!'),
});

const ContactLayout = () => {
	const [userInfo, setUserInfo] = useState([]);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('userInfo'));
		setUserInfo(data);
	}, []);
	useEffect(() => {
		const form = document.querySelector('.form');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			let userNameError = document.querySelector('.error-username');
			let emailError = document.querySelector('.error-email');
			let messageError = document.querySelector('.error-message');
			const formData = new FormData(form);
			try {
				const data = {
					username: formData.get('username'),
					email: formData.get('email'),
					message: formData.get('message'),
				};
				const validateData = await schema.validate(data, { abortEarly: false });
				console.log(
					'🚀 ~ file: ContactLayout.js:44 ~ form.addEventListener ~ validateData',
					validateData
				);
				emailjs
					.send(serviceEmailId, templateEmailId, data, 'gPLE539ysFSTppFrY')
					.then(
						function (response) {
							Toastify({
								text: 'Gửi tin nhắn thành công!',
								style: {
									background: 'linear-gradient(to right, #00b09b, #96c93d)',
								},
							}).showToast();
							console.log('SUCCESS!', response.status, response.text);
						},
						function (err) {
							console.log('FAILED...', err);
						}
					);
			} catch (error) {
				error.inner.forEach((error) => {
					switch (error.path) {
						case 'username':
							userNameError.textContent = error.message;
							break;
						case 'email':
							emailError.textContent = error.message;
							break;
						case 'message':
							messageError.textContent = error.message;
							break;
						default:
							break;
					}
				});
			}
		});
	});
	return /* html */ `
    <section class='px-[4%] py-20 min-h-screen' id='contact'>
      <h4 class="onscrool-text -translate-x-[150%] uppercase text-sm text-gray-400 transition-all duration-1000">GET IN TOUCH</h4>
      <h2 class='onscrool-text -translate-x-[150%] uppercase text-3xl font-medium mt-8 leading-10 transition-all duration-1000'>CONTACT</h2>
      <p class='onscrool-text -translate-x-[150%] mt-10 transition-all duration-1000'>${
				userInfo?.descriptionContact?.replace(/[\r\n]/g, '<br/>') || ''
			}</p>
      <section class='grid xl:grid-cols-2 grid-cols-1 gap-10 mt-10'>
        <section>
          <div
            class='flex justify-between items-center gap-x-4 bg-white mb-10 shadow-lg'
          >
            <div class='p-4 bg-lightMode'>
              <img src="/assets/images/mail-unscreen.gif" alt="" class='h-8 w-8 object-cover'/>
            </div>
            <p class='flex-1'>
              <a href="mailto:${userInfo.email}">${userInfo.email}</a>
            </p>
          </div>

          <div
            class='flex justify-between items-center gap-x-4 bg-white mb-10 shadow-lg'
          >
            <div class='p-4 bg-lightMode'>
              <img src="/assets/images/way-unscreen.gif" alt="" class='h-8 w-8 object-cover'/>
            </div>
            <p class='flex-1 capitalize'>${userInfo.address}</p>
          </div>

          <div
            class='flex justify-between items-center gap-x-4 bg-white mb-10 shadow-lg'
          >
            <div class='p-4 bg-lightMode'>
              <img src="/assets/images/telephone-unscreen.gif" alt="" class='h-8 w-8 object-cover'/>
            </div>
            <p class='flex-1'>
              <a href="tel:${
								userInfo.phone
							}" class='inline-block h-full w-full'>${userInfo.phone}</a>
            </p>
          </div>
        </section>
        <section>
          <form autocomplete="off" class='form'>
            <div class='mb-10'>
              <input type="text" id='name' name="username" placeholder='Name' class='ct-input'/>
              <span class="text-red-500 text-sm error-username"></span>
            </div>
            <div class='mb-10'>
              <input type="email" name="email" id="email" placeholder='Email' class='ct-input'/>
              <span class="text-red-500 text-sm error-email"></span>
            </div>
            <div class='mb-10'>
              <textarea name="message" id="message" placeholder='Message' rows='5' class='ct-input'></textarea>
              <span class="text-red-500 text-sm error-message"></span>
            </div>
            <button class='capitalize py-2 px-8 bg-blue-500 text-white rounded-sm'>send message</button>
          </form>
        </section>
      </section>
    </section>
  `;
};

export default ContactLayout;
