import 'toastify-js/src/toastify.css';

import Toastify from 'toastify-js';
import { addEducation } from '../../../../api/config-education';
import { useEffect } from '../../../../config/config';

const EducateAddNew = () => {
	useEffect(() => {
		const form = document.querySelector('#form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let industry = document.querySelector('#industry').value;
			let school = document.querySelector('#school').value;
			let dateStart = document.querySelector('#date-start').value;
			let dateEnd = document.querySelector('#date-end').value;
			let message = document.querySelector('#intro').value;
			let data = { industry, school, dateStart, dateEnd, message };
			(async () => {
				try {
					await addEducation(data);
					Toastify({
						text: 'Thêm thành công',
						style: {
							background: 'linear-gradient(to right, #00b09b, #96c93d)',
						},
					}).showToast();
					window.location = '/admin/education';
				} catch (error) {
					console.log(error);
				}
			})();
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <form autocomplete='off' id='form'>
        <div class="grid xl:grid-cols-2 grid-cols-1 gap-x-4">
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Tên ngành</label>
            <input
              type="text" name="" id="industry"
              class="border border-gray-200 placeholder:capitalize focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Tên ngành'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>tên trường</label>
            <input
              type="text" name="" id="school"
              class="border border-gray-200 placeholder:capitalize focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Tên trường'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian bắt đầu</label>
            <input
              type="date" name="" id="date-start"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
            />
          </div>
          <div class='flex flex-col mb-5'>
            <label for="" class='capitalize'>Thời gian kết thúc</label>
            <input
              type="date" name="" id="date-end"
              class="border border-gray-200 focus:border-blue-300 p-2 rounded bg-white outline-none"
              placeholder='Thời gian'
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
    </div>
  `;
};

export default EducateAddNew;
