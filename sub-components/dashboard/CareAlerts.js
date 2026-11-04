import Link from 'next/link';
import { AlertTriangle } from 'react-feather';
import { careAlerts } from 'data/dashboard/ClinicalDashboardData';

const CareAlerts = () => (
	<section className="dashboard-card alerts-card">
		<div className="dashboard-card-header"><div><p className="eyebrow">Needs attention</p><h2>Care alerts</h2></div><span className="alert-count">{careAlerts.length}</span></div>
		<div className="alert-list">{careAlerts.map((alert) => <Link href="/patients" className="care-alert" key={alert.patient}><span className={`care-alert-icon ${alert.severity}`}><AlertTriangle size={17} /></span><span><strong>{alert.patient}</strong><small>{alert.message}</small></span><time>{alert.time}</time></Link>)}</div>
		<Link href="/patients" className="card-footer-link">Review all alerts <span>→</span></Link>
	</section>
);

export default CareAlerts;
