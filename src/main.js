import './style.scss';

import {
	Dashboard,
	HomePage,
	NotFound,
	Project,
	ProjectAddPage,
	ProjectAdminPage,
	ProjectEditPage,
} from './pages';
import { render, router } from './config/config';

const app = document.querySelector('#app');

router.on('/', () => render(HomePage, app));
router.on('/project/:idProject', (params) =>
	render(() => Project(params), app)
);
router.on('/admin/dashboard', () => render(Dashboard, app));
router.on('/admin/projects', () => render(ProjectAdminPage, app));
router.on('/admin/project/add-new', () => render(ProjectAddPage, app));
router.on('/admin/project/edit/:idProject', (params) =>
	render(() => ProjectEditPage(params), app)
);

router.notFound(render(NotFound, app));

router.resolve();
