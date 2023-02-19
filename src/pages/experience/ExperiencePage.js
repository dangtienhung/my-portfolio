import { Aside, ExperienceLayout } from '../../components';
import { useEffect, useState } from '../../config/config';

import { getAllCategories } from '../../api/config-categories';

const ExperiencePage = () => {
	const [categories, setCategories] = useState([]);
	console.log(
		'🚀 ~ file: ProjectLayout.js:12 ~ ProjectLayout ~ categories',
		categories
	);
	useEffect(() => {
		(async () => {
			try {
				const res = await getAllCategories();
				setCategories(res.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      <div class='flex-1 bg-white'>
        <div class="h-screen xl:overflow-y-scroll">
          <div class='flex overflow-x-auto justify-end flex-col'>
            ${ExperienceLayout({ categories })}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default ExperiencePage;
