import 'toastify-js/src/toastify.css';

import { useEffect, useState } from '../../../../config/config';

import { getUserInfo } from '../../../../api/config-user-json';

const UserLayout = () => {
	const [info, setInfo] = useState([]);
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('userInfo'));
		console.log('🚀 ~ file: UserLayout.js:11 ~ useEffect ~ data', data);
		(async () => {
			const dataUser = await getUserInfo(data.id || data[0].id);
			setInfo(dataUser?.data);
		})();
	}, []);
	console.log(info);
	return /* html */ `
		<div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
			<h1 class="text-2xl font-semibold mb-10">Thông tin cơ bản của người dùng</h1>
			<div class="text-center h-[300px] w-full flex items-center justify-center">
				<img src="${
					info?.avatar ||
					'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg'
				}" alt="${
		info?.email
	}" class='h-[200px] w-[200px] rounded-full object-cover'>
			</div>
			<div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>Tên người dùng</label>
					<input
						type="text" name="" id="name" disabled value='${
							info?.username || 'Đang cập nhật'
						}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						placeholder='${info.email || 'Đang cập nhật'}'
					/>
				</div>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>Địa chỉ</label>
					<input
						type="text" name="" id="name" disabled value='${
							info?.address || 'Chưa cập nhật'
						}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						placeholder='${info.email || 'Đang cập nhật'}'
					/>
				</div>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>năm sinh</label>
					<input
						type="text" name="" id="name" disabled value='${
							info?.birthday || 'Đang cập nhật'
						}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						placeholder='${info.email || 'Đang cập nhật'}'
					/>
				</div>
        <div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>Vị trí apply</label>
					<input
						type="text" name="" id="name" disabled value='${info?.apply || 'Đang cập nhật'}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
					/>
				</div>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>số điện thoại</label>
					<input
						type="text" name="" id="name" disabled value='${info?.phone || 'Đang cập nhật'}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
					/>
				</div>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>facebook</label>
					<input
						type="text" name="" id="name" disabled value='${
							info?.facebook || 'Đang cập nhật'
						}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						placeholder='${info.email || 'Đang cập nhật'}'
					/>
				</div>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>github</label>
					<input
						type="text" name="" id="name" disabled value='${
							info?.github || 'Đang cập nhật'
						}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
						placeholder='${info.email || 'Đang cập nhật'}'
					/>
				</div>
			</div>
			<div class="grid xl:grid-cols-1 grid-cols-1 gap-x-4">
				<h1 class="text-2xl font-semibold mb-10">Giới thiệu bản thân</h1>
				<div class='flex flex-col mb-5'>
					<label for="" class='capitalize'>giới thiệu</label>
					<textarea
						name="descript-info" id="descript-info" cols="30" rows="5"
						disabled value='${info?.github || 'Đang cập nhật'}'
						class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none resize-none"
						placeholder='giới thiệu bản thân'
					>${info.descriptionInfo}</textarea>
				</div>
			</div>
      <a href="/admin/user/edit-password/${info.id}"
        class='inline-block py-2 px-6 rounded bg-blue-500 cursor-pointer text-white mb-4'>Thay đổi mật khẩu</a>
			<a href="/admin/user/edit/${info.id}"
        class='inline-block py-2 px-6 rounded bg-blue-500 cursor-pointer text-white mb-4'>Cập nhật thông tin</a>
		</div>
	`;
};

export default UserLayout;
