import './style.scss';

import {
	AboutUsPage,
	ContactPage,
	Dashboard,
	EducationPage,
	ExperiencePage,
	HomePage,
	NotFound,
	Project,
	ProjectAddPage,
	ProjectAdminPage,
	ProjectEditPage,
	SignInPage,
	SignUpPage,
	SkillPage,
} from './pages';

import Navigo from 'navigo';
import { render } from './config/config';

const router = new Navigo('/');
const app = document.querySelector('#app');

router.on('/', () => render(HomePage, app));
router.on('/about', () => render(AboutUsPage, app));
router.on('/education', () => render(EducationPage, app));
router.on('/skills', () => render(SkillPage, app));
router.on('/experience', () => render(ExperiencePage, app));
router.on('/contact', () => render(ContactPage, app));
router.on('/project/:idProject', (params) =>
	render(() => Project(params), app)
);

router.on('/admin/sign-up', () => render(SignUpPage, app));
router.on('/admin/sign-in', () => render(SignInPage, app));
router.on('/admin/dashboard', () => render(Dashboard, app));
router.on('/admin/projects', () => render(ProjectAdminPage, app));
router.on('/admin/project/add-new', () => render(ProjectAddPage, app));
router.on('/admin/project/edit/:idProject', (params) =>
	render(() => ProjectEditPage(params), app)
);

router.notFound(() => render(NotFound, app));

router.resolve();
