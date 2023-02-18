import 'toastify-js/src/toastify.css';

import Toastify from 'toastify-js';
import { addSkill } from '../../../../api/config-skill';
import { useEffect } from '../../../../config/config';

const SkillAddLayout = () => {
	useEffect(() => {
		const form = document.querySelector('#form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const title = document.querySelector('#title').value;
			const description = document.querySelector('#intro').value;
			if (title.trim() === '') {
				Toastify({
					text: 'Bạn không được để trống',
					style: {
						background: 'linear-gradient(to right, #00b09b, #96c93d)',
					},
				}).showToast();
				return false;
			}
			const data = { title, description };
			(async () => {
				try {
					await addSkill(data);
					Toastify({
						text: 'Bạn không được để trống',
						style: {
							background: 'linear-gradient(to right, #00b09b, #96c93d)',
						},
					}).showToast();
					window.location = '/admin/skills';
				} catch (error) {
					console.log(error);
				}
			})();
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <form autocomplete='off' id='form'>
        <div class="grid grid-cols-1 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Tên kỹ năng</label>
            <input
              type="text" name="" id="title"
              class="border border-gray-200 placeholder:capitalize focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Tên kỹ năng'
            />
          </div>
        </div>
        <div>
          <textarea
            name="intro" id="intro" cols="30"
            class='w-full h-[100px] border border-gray-400 rounded resize-none outline-none p-4 mb-4'
            placeholder='Giới thiệu (có thể bỏ qua)'></textarea>
        </div>
        <div class="text-center">
          <button type='submit' class="bg-blue-500 rounded-md text-white py-2 w-full max-w-[200px]">Thêm education</button>
        </div>
      </form>
    </div>`;
};

export default SkillAddLayout;
