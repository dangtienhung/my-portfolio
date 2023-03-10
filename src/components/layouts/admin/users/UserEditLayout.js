import 'toastify-js/src/toastify.css';

import {
	COULD_NAME,
	PRESET_NAME,
	avatarDefault,
	router,
	useEffect,
	useState,
} from '../../../../config/config';
import { getUserInfo, updateUerInfo } from '../../../../api/config-user-json';

import Toastify from 'toastify-js';
import axios from 'axios';

const UserEditLayout = () => {
	const [info, setInfo] = useState([]);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('userInfo'));
		(async () => {
			try {
				const datafetch = await getUserInfo(data.id || data[0].id);
				setInfo(datafetch.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	console.log(info);
	const uploadAvatar = async (files) => {
		if (files) {
			const folder_name = 'portfolio';
			const api = `https://api.cloudinary.com/v1_1/${COULD_NAME}/image/upload`;
			const urls = [];
			const formData = new FormData();

			formData.append('upload_preset', PRESET_NAME);
			formData.append('folder', folder_name);

			for (const file of files) {
				formData.append('file', file);
				const res = await axios.post(api, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				urls.push(res.data.secure_url);
			}
			return urls;
		}
	};
	useEffect(() => {
		const form = document.querySelector('.form');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			const avatarNew = document.querySelector('#avatar-new');
			const urls = await uploadAvatar(avatarNew.files);
			let avatar;
			if (urls.length === 0) {
				avatar = document.querySelector('#avatar').src;
			} else {
				avatar = urls;
			}
			const github = document.querySelector('#github').value;
			const facebook = document.querySelector('#facebook').value;
			const username = document.querySelector('#username').value;
			const address = document.querySelector('#address').value;
			const phone = document.querySelector('#phone').value;
			const birthday = document.querySelector('#birthday').value;
			const descriptionInfo = document.querySelector('#descript-info').value;
			const apply = document.querySelector('#apply').value;
			if (
				username.trim() === '' ||
				github.trim() === '' ||
				address.trim() === '' ||
				birthday === '' ||
				descriptionInfo.trim() === ''
			) {
				Toastify({
					text: 'B???n kh??ng ???????c ????? tr???ng',
					style: {
						background: 'linear-gradient(to right, #FF9966, #FF9966)',
					},
					duration: 3000,
				}).showToast();
				return false;
			}
			const data = {
				email: info.email,
				password: info.password,
				username,
				apply,
				avatar,
				address,
				phone,
				birthday,
				github,
				facebook,
				descriptionInfo,
				createdAt: new Date(),
				id: info.id,
			};
			console.log(
				'???? ~ file: UserEditLayout.js:72 ~ form.addEventListener ~ data',
				data
			);
			(async () => {
				await updateUerInfo(data);
				window.location = '/admin/user';
			})();
		});
	});
	return /* html */ `
		<form class='form flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden' autocomplete='off'>
			<div class=''>
				<h1 class="text-2xl font-semibold mb-10">Th??ng tin c?? b???n c???a ng?????i d??ng</h1>
				<div class="text-center h-[300px] w-full grid grid-cols-1 gap-x-4 xl:grid-cols-2">
					<img
						src="${info?.avatar || avatarDefault}"
						alt="${
							info?.email
						}" class='mx-auto h-[200px] w-[200px] rounded-full object-cover'
						id='avatar'
					/>
					<div class='h-full w-full flex flex-col justify-center'>
						<label for="" class='capitalize text-left'>N???u b???n mu???n thay ???nh m???i</label>
						<input
							type="file" id="avatar-new" multiple
							class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						/>
					</div>
				</div>
				<div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>T??n ng?????i d??ng</label>
						<input
							type="text" name="" id="username" value='${info.username || ''}'
							class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
							placeholder='Username'
						/>
					</div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>V??? tr?? apply</label>
            <input
              type="text" name="" id="apply" value='${info?.apply || ''}'
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Apply'
            />
          </div>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>?????a ch???</label>
						<input
							type="text" name="" id="address" value='${info.address || ''}'
							class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
							placeholder='?????a ch???'
						/>
					</div>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>n??m sinh</label>
						<input
							type="date" name="" id="birthday" value='${info.birthday || ''}'
							class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						/>
					</div>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>s??? ??i???n tho???i</label>
						<input
							type="text" name="" id="phone" value='${info.phone || ''}'
							placeholder='s??? ??i???n tho???i'
							class="border placeholder:capitalize border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						/>
					</div>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>facebook</label>
						<input
							type="text" name="" id="facebook" value='${info.facebook || ''}'
							class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
							placeholder='facebook'
						/>
					</div>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>github</label>
						<input
							type="text" name="" id="github" value='${info.github || ''}'
							class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
							placeholder='github'
						/>
					</div>
				</div>
				<div class="grid xl:grid-cols-1 grid-cols-1 gap-x-4">
					<h1 class="text-2xl font-semibold mb-10">Gi???i thi???u b???n th??n</h1>
					<div class='flex flex-col mb-5'>
						<label for="" class='capitalize'>gi???i thi???u</label>
						<textarea
							name="descript-info" id="descript-info" cols="30" rows="5"
							class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none resize-none"
							placeholder='gi???i thi???u b???n th??n'
						>${info.descriptionInfo || ''}</textarea>
					</div>
				</div>
			</div>
			<div class="text-center">
				<button class="bg-blue-500 text-white py-2 px-6 rounded" type='submit'>C???p nh???t th??ng tin</button>
			</div>
		</form>
	`;
};

export default UserEditLayout;
