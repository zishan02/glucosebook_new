'use client'

import Link from 'next/link';
import { Calendar, Download } from 'react-feather';
import { StatRightTopIcon } from 'widgets';
import GlucoseTrend from 'sub-components/dashboard/GlucoseTrend';
import RangeDistribution from 'sub-components/dashboard/RangeDistribution';
import PatientTable from 'sub-components/dashboard/PatientTable';
import CareAlerts from 'sub-components/dashboard/CareAlerts';
import ClinicOverviewCards from 'sub-components/dashboard/ClinicOverviewCards';
import { overviewMetrics } from 'data/dashboard/ClinicalDashboardData';

const Home = () => (
	<div className="dashboard-page">
		<div className="page-heading-row"><div><p className="eyebrow">Tuesday, 3 November</p><h1>Clinical dashboard</h1><p>Monitor patient glucose patterns and prioritize care interventions.</p></div><div className="page-actions"><button className="button-secondary"><Calendar size={17} /> Last 14 days</button><Link href="/reports" className="button-primary"><Download size={17} /> Export report</Link></div></div>
		<ClinicOverviewCards />
		<div className="metrics-grid">{overviewMetrics.map((metric) => <StatRightTopIcon info={metric} key={metric.label} />)}</div>
		<div className="dashboard-grid dashboard-grid-top"><GlucoseTrend /><RangeDistribution /></div>
		<div className="dashboard-grid dashboard-grid-bottom"><PatientTable /><CareAlerts /></div>
	</div>
);

export default Home;
