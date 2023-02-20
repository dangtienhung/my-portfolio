import 'toastify-js/src/toastify.css';

import { getUserInfo, updateUerInfo } from '../../../../api/config-user-json';
import { useEffect, useState } from '../../../../config/config';

import Toastify from 'toastify-js';

const UserEditPassword = (params) => {
	const {
		data: { id },
	} = params;
	const [currentPassword, setCurrentPassword] = useState('');
	const [userInfo, setUserInfo] = useState([]);
	useEffect(async () => {
		try {
			const response = await getUserInfo(id);
			if (response && response.data) {
				setUserInfo(response.data);
				setCurrentPassword(response.data.password);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		const form = document.querySelector('.form');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const oldPassword = document.querySelector('#oldPassword').value;
			const newPassword = document.querySelector('#newPassword').value;
			const newPasswordConfirm = document.querySelector(
				'#newPasswordConfirm'
			).value;
			if (
				oldPassword.trim() === '' ||
				newPassword.trim() === '' ||
				newPasswordConfirm.trim() === ''
			) {
				Toastify({
					text: 'Bạn không được bỏ trống',
					style: {
						background: '#ff9966',
					},
					duration: 3000,
				}).showToast();
				return false;
			}
			if (oldPassword === currentPassword) {
				if (newPassword === newPasswordConfirm) {
					const data = { ...userInfo, password: newPassword };
					await updateUerInfo(data);
					Toastify({
						text: 'Cập nhật mẩu khẩu thành công!',
						duration: 3000,
					}).showToast();
					window.location = '/admin/user';
				} else {
					Toastify({
						text: 'Mật khẩu nhập lại không đúng',
						style: {
							background: '#ff9966',
						},
						duration: 3000,
					}).showToast();
					return false;
				}
			} else {
				Toastify({
					text: 'Mật khẩu cũ không đúng',
					style: {
						background: '#ff9966',
					},
					duration: 3000,
				}).showToast();
				return false;
			}
		});
	});
	return /* html */ `
    <form class='form flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden' autocomplete='off'>
			<div class=''>
				<h1 class="text-2xl font-semibold mb-10">Thay đổi mật khẩu</h1>
        <div class="mb-4 flex flex-col">
          <label for="" class='capitalize'>Nhập mật khẩu cũ</label>
          <input
            type="text" placeholder='Mật khẩu cũ' id='oldPassword'
            class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
          >
        </div>
        <div class="mb-4 flex flex-col">
          <label for="" class='capitalize'>Nhập mật khẩu mới</label>
          <input
            type="text" placeholder='Mật khẩu mới' id='newPassword'
            class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
          >
        </div>
        <div class="mb-4 flex flex-col">
          <label for="" class='capitalize'>Nhập lại mật khẩu mới</label>
          <input
            type="text" placeholder='Nhập lại mật khẩu mới' id='newPasswordConfirm'
            class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
          >
        </div>
			</div>
			<div class="text-center">
				<button class="bg-blue-500 text-white py-2 px-6 rounded" type='submit'>Cập nhật thông tin</button>
			</div>
		</form>
  `;
};

export default UserEditPassword;
