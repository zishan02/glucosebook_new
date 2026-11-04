import Link from 'next/link';
import { notFound } from 'next/navigation';

const modules = {
	reports: { title: 'Reports', description: 'Build scheduled and on-demand clinical outcome reports.' },
	'care-plans': { title: 'Care plans', description: 'Create reusable treatment plans and assign them to patient cohorts.' },
	devices: { title: 'Devices', description: 'Monitor connected glucose devices, sync health, and enrollment.' },
	messages: { title: 'Messages', description: 'Coordinate secure conversations between care teams and patients.' }
};

export default async function ModulePage({ params }) {
	const { module } = await params;
	const currentModule = modules[module];

	if (!currentModule) notFound();

	return (
		<div className="module-page">
			<div className="page-heading-row"><div><p className="eyebrow">Application module</p><h1>{currentModule.title}</h1><p>{currentModule.description}</p></div><Link href="/" className="button-secondary">Back to dashboard</Link></div>
			<section className="module-card">
				<h2>Extension point ready</h2>
				<p>This route is wired into the shared shell and navigation. Build the feature using the same card, table, form, status, and page-heading patterns as the dashboard.</p>
				<div className="module-checklist"><div>1. Define API-shaped mock data</div><div>2. Compose reusable UI modules</div><div>3. Add loading, empty, and error states</div></div>
			</section>
		</div>
	);
}

export function generateStaticParams() {
	return Object.keys(modules).map((module) => ({ module }));
}
