const links = [
	{
		id: 2,
		title: 'Quản lý dự án',
		to: '/admin/projects',
	},
	{
		id: 3,
		title: 'Thông tin người dùng',
		to: '/admin/user',
	},
	{
		id: 4,
		title: 'Học vấn',
		to: '/admin/education',
	},
	{
		id: 5,
		title: 'Kỹ năng',
		to: '/admin/skills',
	},
	{
		id: 6,
		title: 'Liên hệ',
		to: '/admin/contact',
	},
	{
		id: 7,
		title: 'Categories',
		to: '/admin/categories',
	},
];

const AsideAdmin = () => {
	return /* html */ `
		<div class='w-full max-w-xs p-4 bg-lightMode shadow-lg h-full rounded-lg hidden xl:block'>
			<div class="overflow-y-auto h-full -mr-4 pr-4">
			<ul>
			${links
				.map(
					(link) => `
					<li><a href="${link.to}" class='p-2 hover:bg-blue-400 transition-all duration-200 inline-block w-full rounded-lg hover:text-white mb-4'>${link.title}</a></li>
					`
				)
				.join('')}
				</ul>
			</div>
		</div>
	`;
};

export default AsideAdmin;
