import { Aside, ProjectLayout } from '../../components';

const Project = (params) => {
	return /* html */ `
    <div class='flex justify-between bg-lightMode'>
      ${Aside()}
      ${ProjectLayout(params)}
    </div>
  `;
};

export default Project;
