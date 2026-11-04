import { clinicOverviewMetrics } from 'data/dashboard/ClinicalDashboardData';

const ClinicOverviewCards = () => (
	<section className="clinic-overview-section" aria-labelledby="clinic-overview-title">
		<div className="clinic-overview-heading">
			<div>
				<p className="eyebrow">Clinic overview</p>
				<h2 id="clinic-overview-title">Current patient control</h2>
			</div>
			<span>Updated today</span>
		</div>
		<div className="clinic-kpi-grid">
			{clinicOverviewMetrics.map((metric) => (
				<article className={`clinic-kpi-card clinic-kpi-${metric.tone}`} key={metric.label}>
					<div className="clinic-kpi-label"><span></span>{metric.label}</div>
					<strong>{metric.value}</strong>
					{metric.hint && <p>{metric.hint}</p>}
				</article>
			))}
		</div>
	</section>
);

export default ClinicOverviewCards;
