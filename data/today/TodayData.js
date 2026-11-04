export const todayWorklist = [
	{
		id: 'riya-kapoor',
		name: 'Riya Kapoor',
		avatar: '/images/avatar/avatar-7.jpg',
		reading: 58,
		unit: 'mg/dL',
		zone: 'Critical low',
		zoneTone: 'danger',
		time: '12 min ago',
		headline: 'Repeated overnight lows — review medication and meal timing.',
		chips: ['Logged · 4', 'Open alert', 'Glucose priority'],
		categories: ['logged', 'alert', 'priority'],
		reviewed: false,
		educator: 'Anita Rao'
	},
	{
		id: 'arun-mehta',
		name: 'Arun Mehta',
		avatar: '/images/avatar/avatar-8.jpg',
		reading: 238,
		unit: 'mg/dL',
		zone: 'High',
		zoneTone: 'warning',
		time: '24 min ago',
		headline: 'Post-meal glucose remains elevated for more than two hours.',
		chips: ['Logged · 3', "Today's plan", 'Open alert'],
		categories: ['logged', 'plan', 'alert'],
		reviewed: false,
		educator: 'Neha Singh'
	},
	{
		id: 'meera-shah',
		name: 'Meera Shah',
		avatar: '/images/avatar/avatar-9.jpg',
		reading: 126,
		unit: 'mg/dL',
		zone: 'In range',
		zoneTone: 'success',
		time: '31 min ago',
		headline: 'Logged all scheduled readings. Daily review is complete.',
		chips: ['Logged · 4'],
		categories: ['logged'],
		reviewed: true,
		educator: 'Anita Rao'
	},
	{
		id: 'kabir-khan',
		name: 'Kabir Khan',
		avatar: '/images/avatar/avatar-10.jpg',
		reading: null,
		unit: '',
		zone: 'No reading',
		zoneTone: 'neutral',
		time: 'Last seen yesterday',
		headline: 'Follow-up due today; patient has not shared a morning reading.',
		chips: ["Today's plan", 'Flagged in review'],
		categories: ['plan', 'review'],
		reviewed: false,
		educator: 'Neha Singh'
	},
	{
		id: 'sana-iyer',
		name: 'Sana Iyer',
		avatar: '/images/avatar/avatar-11.jpg',
		reading: 184,
		unit: 'mg/dL',
		zone: 'Watch',
		zoneTone: 'warning',
		time: '48 min ago',
		headline: 'Time in range has dropped below the weekly care goal.',
		chips: ['Glucose priority', "Today's plan"],
		categories: ['priority', 'plan'],
		reviewed: false,
		educator: 'Anita Rao'
	},
	{
		id: 'vikram-rao',
		name: 'Vikram Rao',
		avatar: '/images/avatar/avatar-12.jpg',
		reading: 93,
		unit: 'mg/dL',
		zone: 'In range',
		zoneTone: 'success',
		time: '1 hr ago',
		headline: 'Care-team note added after yesterday’s review.',
		chips: ['Flagged in review'],
		categories: ['review'],
		reviewed: false,
		educator: 'Neha Singh'
	}
];

export const todayCalls = {
	silent: [
		{ name: 'Kabir Khan', detail: '3 days silent', educator: 'Neha Singh', urgent: true },
		{ name: 'Divya Nair', detail: 'Never messaged', educator: 'Anita Rao', urgent: true },
		{ name: 'Rohan Das', detail: '2 days silent', educator: 'Neha Singh', urgent: false }
	],
	renewals: [
		{ name: 'Pooja Verma', detail: 'Ends today', educator: 'Anita Rao', urgent: true },
		{ name: 'Harish Patel', detail: '2 days left', educator: 'Neha Singh', urgent: false }
	]
};
