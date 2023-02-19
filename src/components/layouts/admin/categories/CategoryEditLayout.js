import 'toastify-js/src/toastify.css';

import {
	getOneCategory,
	updateCategory,
} from '../../../../api/config-categories';
import { useEffect, useState } from '../../../../config/config';

import Toastify from 'toastify-js';

const CategoryEditLayout = (params) => {
	const [category, setCategory] = useState([]);
	console.log(
		'🚀 ~ file: CategoryEditLayout.js:7 ~ CategoryEditLayout ~ category',
		category
	);
	const {
		data: { id },
	} = params;
	useEffect(() => {
		(async () => {
			try {
				const res = await getOneCategory(id);
				if (res && res.data) {
					setCategory(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	useEffect(() => {
		const form = document.querySelector('#form');
		form.addEventListener('submit', async (e) => {
			e.preventDefault();
			let title = document.querySelector('#title').value;
			let desc = document.querySelector('#description').value;
			if (title.trim() === '' || desc.trim() === '') {
				Toastify({
					text: 'Không được để trống',
					style: {
						background: 'linear-gradient(to right, #00b09b, #96c93d)',
					},
					position: 'left',
					duration: 3000,
				}).showToast();
				return false;
			}
			const data = { id, title, desc };
			(async () => {
				try {
					await updateCategory(data);
					Toastify({
						text: 'Sửa danh mục thành công!',
						style: {
							background: 'linear-gradient(to right, #00b09b, #96c93d)',
						},
						position: 'left',
						duration: 3000,
					}).showToast();
					window.location = '/admin/categories';
				} catch (error) {
					console.log(error);
				}
			})();
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <div>
        <button class='inline-block mb-4'>
          <a href="/admin/category/add-new" class="inline-block bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm danh mục</a>
        </button>
      </div>
      <div class="flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden">
        <h1 class="text-2xl font-semibold mb-10">Sửa danh mục: ${category.title}</h1>
        <form autocomplete='off' id='form'>
          <div class="grid grid-cols-1 gap-x-4">
            <div class='flex flex-col mb-5'>
              <label for="" class='capitalize'>Tên danh mục</label>
              <input
                type="text" name="" id="title" value='${category.title}'
                class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
                placeholder='Tên danh mục'
              />
            </div>
            <div class='flex flex-col mb-5'>
              <label for="" class='capitalize'>Miêu tả</label>
              <textarea
                name="description" id="description" cols="30" rows="5" placeholder='Mô tả dự án'
                class="border resize-none border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none" placeholder='Tên dự án'
              >${category.desc}</textarea>
            </div>
          </div>
          <div class="text-center">
            <button type='submit' class="bg-blue-500 rounded-md text-white py-2 w-full max-w-[200px]">Thêm danh mục</button>
          </div>
        </form>
      </div>
    </div>
  `;
};

export default CategoryEditLayout;
