import './style.scss';

import {
	AboutUsPage,
	Categories,
	CategoryAdd,
	CategoryEdit,
	ContactPage,
	Dashboard,
	EducationAdd,
	EducationAdmin,
	EducationEditPage,
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
	SkillAddPage,
	SkillPage,
	SkillPageAdmin,
	UserEdit,
	UserEditPasswordPage,
	UserPage,
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
router.on('/admin/user', () => render(UserPage, app));
router.on('/admin/user/edit/:id', (params) =>
	render(() => UserEdit(params), app)
);
router.on('/admin/education', () => render(EducationAdmin, app));
router.on('/admin/education/add', () => render(EducationAdd, app));
router.on('/admin/education/edit/:idEducate', (params) =>
	render(() => EducationEditPage(params), app)
);
router.on('/admin/skills', () => render(SkillPageAdmin, app));
router.on('/admin/skills/add', () => render(SkillAddPage, app));
router.on('/admin/skill/edit/:idSkill');
router.on('/admin/categories', () => render(Categories, app));
router.notFound(() => render(NotFound, app));
router.on('/admin/category/add-new', () => render(CategoryAdd, app));
router.on('/admin/category/edit/:id', (params) =>
	render(() => CategoryEdit(params), app)
);
router.on('/admin/user/edit-password/:id', (params) =>
	render(() => UserEditPasswordPage(params), app)
);

router.resolve();
