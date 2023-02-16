import { Aside, SkillLayout } from '../../components';

const SkillPage = () => {
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      <div class='flex-1 bg-white'>
        <div class="h-screen xl:overflow-y-scroll">
          <div class='flex overflow-x-auto justify-end flex-col'>
            ${SkillLayout()}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default SkillPage;
