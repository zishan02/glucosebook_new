'use client'

import dynamic from 'next/dynamic';
import { glucoseTrend } from 'data/dashboard/ClinicalDashboardData';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const GlucoseTrend = () => {
	const options = {
		chart: { toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'Inter, sans-serif' },
		colors: ['#635bff', '#a78bfa'], dataLabels: { enabled: false },
		stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 6] },
		fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.24, opacityTo: 0.02, stops: [0, 95, 100] } },
		grid: { borderColor: '#e9edf5', strokeDashArray: 4, padding: { left: 8, right: 8 } },
		xaxis: { categories: glucoseTrend.categories, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#8a94a6' } } },
		yaxis: { min: 60, max: 220, tickAmount: 4, labels: { formatter: (value) => `${value}`, style: { colors: '#8a94a6' } } },
		legend: { show: false }, tooltip: { y: { formatter: (value) => `${value} mg/dL` } }
	};

	return (
		<section className="dashboard-card trend-card">
			<div className="dashboard-card-header"><div><p className="eyebrow">Glucose overview</p><h2>Weekly glucose trend</h2></div><select className="app-select" aria-label="Glucose trend period"><option>Last 7 days</option><option>Last 14 days</option><option>Last 30 days</option></select></div>
			<div className="chart-summary">
				<div><span className="chart-dot primary"></span><p>Average glucose</p><strong>128 <small>mg/dL</small></strong></div>
				<div><span className="chart-dot secondary"></span><p>Time in range</p><strong>76 <small>%</small></strong></div>
			</div>
			<div className="trend-chart"><Chart options={options} series={glucoseTrend.series} type="area" height={310} /></div>
		</section>
	);
};

export default GlucoseTrend;
