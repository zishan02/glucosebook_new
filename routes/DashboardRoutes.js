export const DashboardMenu = [
	{
		title: 'Overview',
		items: [
			{ name: 'Clinical dashboard', link: '/', icon: 'grid' },
			{ name: "Today's worklist", link: '/today', icon: 'check-square', badge: '18' },
			{ name: 'Reports', link: '/reports', icon: 'bar-chart-2' }
		]
	},
	{
		title: 'Care management',
		items: [
			{ name: 'Patients', link: '/patients', icon: 'users', badge: '96' },
			{ name: 'Care plans', link: '/care-plans', icon: 'clipboard' },
			{ name: 'Devices', link: '/devices', icon: 'activity' },
			{ name: 'Messages', link: '/messages', icon: 'message-square', badge: '3' }
		]
	},
	{
		title: 'Workspace',
		items: [
			{ name: 'Team', link: '/pages/profile', icon: 'user-check' },
			{ name: 'Settings', link: '/pages/settings', icon: 'settings' }
		]
	}
];

export default DashboardMenu;
