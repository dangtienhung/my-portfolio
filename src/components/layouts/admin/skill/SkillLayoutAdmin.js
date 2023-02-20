import { useEffect, useState } from '../../../../config/config';

import Swal from 'sweetalert2';
import { getAll } from '../../../../api/config-skill';

const SkillLayoutAdmin = () => {
	const [skills, setSkills] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await getAll();
			if (response) {
				setSkills(response.data);
			}
		})();
	}, []);
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <div>
        <button class='inline-block mb-4'>
          <a href="/admin/skills/add" class="inline-block bg-blue-400 outline-none py-3 px-8 text-white capitalize rounded">Thêm kỹ năng</a>
        </button>
      </div>
      <div class="overflow-x-scroll rounded-lg bg-white shadow-md scroll-smooth">
        <table class='w-full'>
          <thead class='bg-[#f7f7f8]'>
            <tr>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Stt</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">tên kỹ năng</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Mô tả dự án</th>
              <th class="whitespace-nowrap py-5 px-7 text-left align-middle font-semibold capitalize">Active</th>
            </tr>
          </thead>
          <body>
            ${skills.map((skill, index) => {
							return /* html */ `
                <tr class='even:bg-lightMode'>
                  <td class="whitespace-nowrap py-4 px-7">
                    ${index < 10 ? `0${index + 1}` : index + 1}
                  </td>
                  <td class="py-4 w-full min-w-[300px]">
                    <p>${skill.title}</p>
                  </td>
                  <td class="py-4 px-2 w-full min-w-[300px] overflow-hidden !h-28">
                    <p class='overflow-y-auto w-full h-full'>
                      ${skill.description.replace(/[\r\n]/g, '<br/>')}
                    </p>
                  </td>
                  <td class='whitespace-nowrap py-4 px-7 !h-28 flex w-full gap-x-2 items-center'>
                    <div class='btn-edit h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'>
                      <a href="/admin/project/edit/${
												skill.id
											}" class='inline-block'>
                        <img class='h-full w-full object-cover' src="/public/assets/images/project-active/edit-unscreen.gif" alt="">
                      </a>
                    </div>
                    <div
                      class='btn-delete h-10 w-10 hover:bg-gray-400 text-white flex items-center justify-center cursor-pointer rounded-sm'
                      data-id='${skill.id}'
                      >
                      <img class='h-full w-full object-cover' src="/public/assets/images/project-active/bin-unscreen.gif" alt="">
                    </div>
                  </td>
                </tr>
              `;
						})}
          </body>
        </table>
      </div>
    </div>`;
};

export default SkillLayoutAdmin;
