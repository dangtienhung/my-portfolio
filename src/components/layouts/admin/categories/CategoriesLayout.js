import {
	deleteCategory,
	getAllCategories,
} from '../../../../api/config-categories';
import { useEffect, useState } from '../../../../config/config';

import Swal from 'sweetalert2';

const CategoriesLayout = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const respon = await getAllCategories();
				if (respon) {
					setCategories(respon.data);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	useEffect(() => {
		const btnDelete = document.querySelectorAll('.btn-delete');
		if (btnDelete) {
			btnDelete.forEach((btn) => {
				btn.addEventListener('click', function (e) {
					const id = this.dataset.id;
					console.log('🚀 ~ file: ProjectLayout.js:28 ~ id', id);
					e.preventDefault();
					Swal.fire({
						title: 'Bạn có chắc chắn muốn xóa?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!',
					}).then((result) => {
						if (result.isConfirmed) {
							Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
							(async () => {
								try {
									const newCategories = categories.filter(
										(item) => item.id != id
									);
									await deleteCategory(id);
									setCategories(newCategories);
								} catch (error) {
									console.log(error);
								}
							})();
						}
					});
				});
			});
		}
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <div>
        <button class='inline-block mb-4'>
          <a href="/admin/category/add-new" class="inline-block bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm danh mục</a>
        </button>
      </div>
      <div class="overflow-x-scroll rounded-lg bg-white shadow-md scroll-smooth">
        <table class='w-full'>
          <thead class='bg-[#f7f7f8]'>
            <tr>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Stt</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">tên danh mục</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Mô tả danh mục</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Active</th>
            </tr>
            </thead>
            <body>
              ${categories
								.map((category, index) => {
									return /* html */ `
                  <tr class='even:bg-lightMode'>
                    <td class="whitespace-nowrap py-4 px-7">
                      ${index < 10 ? `0${index + 1}` : index + 1}
                    </td>
                    <td class="p-4 w-full min-w-[300px]">
                      <p>${category.title}</p>
                    </td>
                    <td class="p-4 w-full min-w-[300px] overflow-hidden !h-32">
                      <p class='overflow-y-auto w-full h-full'>
                        ${category.desc}
                      </p>
                    </td>
                    <td class='whitespace-nowrap py-4 px-7 !h-28 flex w-full gap-x-2 items-center'>
                      <div class='btn-edit h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'>
                        <a
                          href="/admin/category/edit/${category.id}"
                          class='inline-block'
                        >
                          <img class='h-full w-full object    -cover' src="/public/assets/images/project-active/edit-unscreen.gif" alt="">
                        </a>
                      </div>
                      <div
                        class='btn-delete h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'
                        data-id='${category.id}'
                      >
                        <img class='h-full w-full object-cover' src="/public/assets/images/project-active/bin-unscreen.gif" alt="">
                      </div>
                    </td>
                  </tr>
                `;
								})
								.join('')}
            </body>
          </thead>
        </table>
      </div>
    </div>
  `;
};

export default CategoriesLayout;
