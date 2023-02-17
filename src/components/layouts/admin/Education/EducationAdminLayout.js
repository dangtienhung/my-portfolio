import { deleteEducate, getAll } from '../../../../api/config-education';
import { useEffect, useState } from '../../../../config/config';

import Swal from 'sweetalert2';

const EducationAdminLayout = () => {
	const [education, setEducation] = useState([]);
	useEffect(() => {
		(async () => {
			const respon = await getAll();
			setEducation(respon.data);
		})();
	}, []);
	useEffect(() => {
		const btnDelete = document.querySelectorAll('.btn-delete');
		if (btnDelete) {
			btnDelete.forEach((btn) => {
				btn.addEventListener('click', function (e) {
					const id = this.dataset.id;
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
									const newProject = education.filter((item) => item.id != id);
									await deleteEducate(id);
									setEducation(newProject);
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
        <button class='xl:hidden inline-block mb-4'>
          <a href="/admin/project/add-new" class="inline-block bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm dự án</a>
        </button>
      </div>
      <div class=''>
        <a href="/admin/education/add" data-navigo
          class='px-6 py-2 rounded text-white bg-blue-500 mb-4 inline-block'
        >Thêm mới</a>
      </div>
      <div class="overflow-x-scroll rounded-lg bg-white shadow-md scroll-smooth">
        <table class='w-full'>
          <thead class='bg-[#f7f7f8]'>
            <tr>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Stt</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Tên ngành</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">tên trường</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Mô tả</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Active</th>
            </tr>
          </thead>
          <tbody>
            ${education
							.map((educate, index) => {
								const date = {
									dateStart: educate?.dateStart.replace(/-/g, '/'),
									dateEnd: educate?.dateEnd.replace(/-/g, '/'),
								};
								return /* html */ `
                <tr class='even:bg-lightMode'>
                  <td class="whitespace-nowrap py-4 px-7">
                    ${index < 10 ? `0${index + 1}` : index + 1}
                  </td>
                  <td class='p-4'><p>${educate.industry}</p></td>
                  <td class='p-4 w-full min-w-[300px]'>
                    <p>${educate.school}</p>
                    <time class="text-sm text-gray-500 inline-block">
                      Date: ${date.dateStart} - ${date.dateEnd}
                    </time>
                  </td>
                  <td class="py-4 px-2 w-full min-w-[300px] overflow-hidden !h-28">
                    <p class='overflow-y-auto w-full h-full'>
                      ${educate.message}</p>
                  </td>
                  <td class='whitespace-nowrap py-4 px-7 !h-28 flex w-full gap-x-2 items-center'>
                    <div class='btn-edit h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'>
                      <a href="/admin/education/edit/${
												educate.id
											}" class='inline-block'>
                        <img class='h-full w-full object-cover' src="/public/assets/images/project-active/edit-unscreen.gif" alt="">
                      </a>
                    </div>
                    <div
                      class='btn-delete h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'
                      data-id='${educate.id}'
                      >
                      <img class='h-full w-full object-cover' src="/public/assets/images/project-active/bin-unscreen.gif" alt="">
                    </div>
                  </td>
                </tr>
              `;
							})
							.join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
};

export default EducationAdminLayout;
