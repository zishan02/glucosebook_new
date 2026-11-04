export const overviewMetrics = [
	{ label: 'Average glucose', value: '128', unit: 'mg/dL', change: '4.2%', direction: 'down', helper: 'vs. previous 14 days', icon: 'activity', tone: 'blue' },
	{ label: 'Time in range', value: '76', unit: '%', change: '3.8%', direction: 'up', helper: '70–180 mg/dL target', icon: 'target', tone: 'green' },
	{ label: 'Estimated A1C', value: '6.4', unit: '%', change: '0.3%', direction: 'down', helper: 'Glucose management indicator', icon: 'trending-down', tone: 'orange' },
	{ label: 'Active patients', value: '248', unit: '', change: '12', direction: 'up', helper: 'new this month', icon: 'users', tone: 'purple' }
];

export const clinicOverviewMetrics = [
	{ label: 'Active patients', value: '96', tone: 'default' },
	{ label: 'Clinic control score', value: '43', hint: '0–100, higher is better', tone: 'primary' },
	{ label: '% green today', value: '—', tone: 'success' },
	{ label: 'Open alerts', value: '40', tone: 'danger' },
	{ label: 'At-risk patients', value: '40', hint: 'Control score under 40', tone: 'warning' }
];

export const glucoseTrend = {
	categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	series: [
		{ name: 'Average glucose', data: [142, 136, 131, 138, 126, 121, 128] },
		{ name: 'Target midpoint', data: [125, 125, 125, 125, 125, 125, 125] }
	]
};

export const rangeDistribution = [
	{ label: 'In range', value: 76, color: '#16a34a' },
	{ label: 'Above range', value: 17, color: '#f59e0b' },
	{ label: 'Below range', value: 7, color: '#ef4444' }
];

export const recentPatients = [
	{ name: 'James Wilson', email: 'james.wilson@example.com', image: '/images/avatar/avatar-2.jpg', glucose: 214, trend: 'up', range: 'High', updated: '8 min ago' },
	{ name: 'Sophia Chen', email: 'sophia.chen@example.com', image: '/images/avatar/avatar-3.jpg', glucose: 126, trend: 'steady', range: 'In range', updated: '12 min ago' },
	{ name: 'Olivia Martin', email: 'olivia.martin@example.com', image: '/images/avatar/avatar-4.jpg', glucose: 64, trend: 'down', range: 'Low', updated: '22 min ago' },
	{ name: 'Noah Brown', email: 'noah.brown@example.com', image: '/images/avatar/avatar-5.jpg', glucose: 148, trend: 'steady', range: 'In range', updated: '35 min ago' },
	{ name: 'Ava Thompson', email: 'ava.thompson@example.com', image: '/images/avatar/avatar-6.jpg', glucose: 176, trend: 'up', range: 'Watch', updated: '48 min ago' }
];

export const careAlerts = [
	{ patient: 'James Wilson', message: 'Glucose above 200 mg/dL for 45 minutes', time: '8 min', severity: 'high' },
	{ patient: 'Olivia Martin', message: 'Predicted low within the next 20 minutes', time: '22 min', severity: 'urgent' },
	{ patient: 'Ava Thompson', message: 'Time in range dropped below weekly goal', time: '48 min', severity: 'medium' }
];
