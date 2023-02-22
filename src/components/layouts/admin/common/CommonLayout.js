import 'toastify-js/src/toastify.css';

import { getUserInfo, updateUerInfo } from '../../../../api/config-user-json';
import { useEffect, useState } from '../../../../config/config';

import Quill from 'quill';
import Toastify from 'toastify-js';

const CommonLayout = () => {
	const [homepage, setHomePage] = useState([]);
	const [introEducate, setIntroEducate] = useState([]);
	useEffect(async () => {
		try {
			const { id } = JSON.parse(localStorage.getItem('userInfo'));
			const respon = await getUserInfo(id);
			if (respon && respon.data) {
				setHomePage(respon.data);
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		// const btnHomePage = document.querySelector('.btn-homepage');
		// btnHomePage.addEventListener('click', async (e) => {
		// 	e.preventDefault();
		// 	const homePageValue = document.querySelector('#home-page').value;
		// 	const dataHome = { ...homepage, descriptionInfo: homePageValue };
		// 	localStorage.setItem('userInfo', JSON.stringify(dataHome));
		// 	try {
		// 		await updateUerInfo(dataHome);
		// 		Toastify({
		// 			text: 'Cập nhật thành công',
		// 			duration: 3000,
		// 		}).showToast();
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// });
		// educaiton
		const btnEducation = document.querySelector('.btn-education');
		btnEducation.addEventListener('click', async (e) => {
			e.preventDefault();
			const descriptionEducation =
				document.querySelector('#education-page').value;
			const dataEducaton = { ...homepage, descriptionEducation };
			localStorage.setItem('userInfo', JSON.stringify(dataEducaton));
			try {
				await updateUerInfo(dataEducaton);
				Toastify({
					text: 'Cập nhật thành công',
					duration: 3000,
				}).showToast();
			} catch (error) {
				console.log(error);
			}
		});
		// skills
		const btnSkill = document.querySelector('.btn-skills');
		btnSkill.addEventListener('click', async (e) => {
			const descriptionSkill = document.querySelector('#skill-page').value;
			const dataSkill = { ...homepage, descriptionSkill };
			localStorage.setItem('userInfo', JSON.stringify(dataSkill));
			try {
				await updateUerInfo(dataSkill);
				Toastify({
					text: 'Cập nhật thành công',
					duration: 3000,
				}).showToast();
			} catch (error) {
				console.log(error);
			}
		});
		const btnExperience = document.querySelector('.btn-experience');
		btnExperience.addEventListener('click', async () => {
			const descriptionExerience =
				document.querySelector('#experience-page').value;
			const dataExperice = { ...homepage, descriptionExerience };
			localStorage.setItem('userInfo', JSON.stringify(dataExperice));
			try {
				await updateUerInfo(dataExperice);
				Toastify({
					text: 'Cập nhật thành công',
					duration: 3000,
				}).showToast();
			} catch (error) {
				console.log(error);
			}
		});
		const btnContact = document.querySelector('.btn-contact');
		btnContact.addEventListener('click', async () => {
			const descriptionContact = document.querySelector('#contact-page').value;
			const dataContact = { ...homepage, descriptionContact };
			localStorage.setItem('userInfo', JSON.stringify(dataContact));
			try {
				await updateUerInfo(dataContact);
				Toastify({
					text: 'Cập nhật thành công',
					duration: 3000,
				}).showToast();
			} catch (error) {
				console.log(error);
			}
		});
	});
	useEffect(() => {
		let quill = new Quill('#home-page', {
			theme: 'snow',
		});
		quill.setContents([{ insert: `${homepage.descriptionInfo}` }]);
		// quill.setText(`${homepage.descriptionInfo}`);
		const btnHomePage = document.querySelector('.btn-homepage');
		btnHomePage.addEventListener('click', async (e) => {
			e.preventDefault();
			const descriptionInfo = quill.root.innerHTML;
			const dataHome = { ...homepage, descriptionInfo };
			localStorage.setItem('userInfo', JSON.stringify(dataHome));
			try {
				await updateUerInfo(dataHome);
				Toastify({
					text: 'Cập nhật thành công',
					duration: 3000,
				}).showToast();
			} catch (error) {
				console.log(error);
			}
		});
	});
	return /* html */ `
    <div class='flex-1 p-4 bg-lightMode rounded-lg shadow-lg overflow-hidden'>
      <div class="home-page mb-10">
        <label for="" class='capitalize !mb-4 text-2xl font-semibold'>Home page</label>
        <div id="home-page"></div>
        <button class="btn-homepage outline-none bg-blue-400 text-white py-2 px-6 rounded">cập nhật thông tin</button>
      </div>
      <div class="education">
        <label for="" class='capitalize mb-4'>education page</label>
        <textarea
          name="education-page" id="education-page" cols="30" rows="5"
          placeholder='Giới thiệu quá trinh học tập'
          class='outline-none w-full p-2 rounded border resize-none border-gray-200 focus:border-blue-400'
        >${homepage?.descriptionEducation || ''}</textarea>
        <button class="btn-education outline-none bg-blue-400 text-white py-2 px-6 rounded">cập nhật thông tin</button>
      </div>
      <div class="skills mt-10">
        <label for="" class='capitalize mb-4'>Skill page</label>
        <textarea
          name="skill-page" id="skill-page" cols="30" rows="5"
          placeholder='Giới thiệu các kỹ năng bạn có'
          class='outline-none w-full p-2 rounded border resize-none border-gray-200 focus:border-blue-400'
        >${homepage?.descriptionSkill || ''}</textarea>
        <button class="btn-skills outline-none bg-blue-400 text-white py-2 px-6 rounded">cập nhật thông tin</button>
      </div>
      <div class="experience mt-10">
        <label for="" class="capitalize mb-4">experience</label>
        <textarea
          name="experience-page" id="experience-page" cols="30" rows="5"
          placeholder='Giới thiệu các kỹ năng bạn có'
          class='outline-none w-full p-2 rounded border resize-none border-gray-200 focus:border-blue-400'
        >${homepage?.descriptionExerience || ''}</textarea>
        <button class="btn-experience outline-none bg-blue-400 text-white py-2 px-6 rounded">cập nhật thông tin</button>
      </div>
      <div class="contact mt-10">
        <label for="" class="capitalize mb-4">contact</label>
        <textarea
          name="contact-page" id="contact-page" cols="30" rows="5"
          placeholder='Giới thiệu các kỹ năng bạn có'
          class='outline-none w-full p-2 rounded border resize-none border-gray-200 focus:border-blue-400'
        >${homepage?.descriptionContact || ''}</textarea>
        <button class="btn-contact outline-none bg-blue-400 text-white py-2 px-6 rounded">cập nhật thông tin</button>
      </div>
    </div>
  `;
};

export default CommonLayout;
