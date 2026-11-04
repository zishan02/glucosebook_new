'use client'

import dynamic from 'next/dynamic';
import { rangeDistribution } from 'data/dashboard/ClinicalDashboardData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RangeDistribution = () => {
	const options = {
		chart: { fontFamily: 'Inter, sans-serif' }, labels: rangeDistribution.map((item) => item.label), colors: rangeDistribution.map((item) => item.color),
		dataLabels: { enabled: false }, legend: { show: false }, stroke: { width: 0 },
		plotOptions: { pie: { donut: { size: '76%', labels: { show: true, name: { show: true, offsetY: 18, color: '#8a94a6' }, value: { show: true, offsetY: -18, fontSize: '30px', fontWeight: 700, color: '#162033', formatter: (value) => `${value}%` }, total: { show: true, label: 'In range', color: '#8a94a6', formatter: () => '76%' } } } } },
		tooltip: { y: { formatter: (value) => `${value}%` } }
	};

	return (
		<section className="dashboard-card range-card">
			<div className="dashboard-card-header"><div><p className="eyebrow">Distribution</p><h2>Time in range</h2></div><button className="card-action" aria-label="Time in range options">•••</button></div>
			<div className="range-chart"><Chart options={options} series={rangeDistribution.map((item) => item.value)} type="donut" height={240} /></div>
			<div className="range-legend">{rangeDistribution.map((item) => <div key={item.label}><span style={{ backgroundColor: item.color }}></span><p>{item.label}</p><strong>{item.value}%</strong></div>)}</div>
		</section>
	);
};

export default RangeDistribution;
