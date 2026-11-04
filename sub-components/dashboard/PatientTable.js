import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { ArrowDown, ArrowRight, ArrowUp, Search } from 'react-feather';
import { recentPatients } from 'data/dashboard/ClinicalDashboardData';

const trendIcons = { up: ArrowUp, down: ArrowDown, steady: ArrowRight };

const PatientTable = () => (
	<section className="dashboard-card patient-card">
		<div className="dashboard-card-header patient-card-header"><div><p className="eyebrow">Live monitoring</p><h2>Recent patients</h2></div><div className="table-actions"><label><Search size={16} /><input type="search" placeholder="Search patients" aria-label="Search patients" /></label><Link href="/patients" className="button-secondary">View all</Link></div></div>
		<div className="table-responsive"><table className="app-table">
			<thead><tr><th>Patient</th><th>Current glucose</th><th>Status</th><th>Last reading</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
			<tbody>{recentPatients.map((patient) => {
				const TrendIcon = trendIcons[patient.trend];
				return <tr key={patient.email}>
					<td><div className="patient-identity"><Image src={patient.image} alt="" /><span><strong>{patient.name}</strong><small>{patient.email}</small></span></div></td>
					<td><div className={`glucose-reading ${patient.trend}`}><strong>{patient.glucose}</strong><span>mg/dL</span><TrendIcon size={15} /></div></td>
					<td><span className={`status-pill status-${patient.range.toLowerCase().replace(' ', '-')}`}>{patient.range}</span></td>
					<td className="muted-cell">{patient.updated}</td><td><Link href="/patients" className="row-action" aria-label={`View ${patient.name}`}>›</Link></td>
				</tr>;
			})}</tbody>
		</table></div>
	</section>
);

export default PatientTable;
