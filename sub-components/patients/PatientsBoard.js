'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { AlertTriangle, Check, MoreHorizontal, Plus, Search, Star, UserPlus, X } from 'react-feather';
import { patientTotals, patientsData } from 'data/patients/PatientsData';

const categories = ['T', 'E', 'W', 'Doc', 'G'];

const Sparkline = ({ cells }) => (
	<div className="patients-sparkline" aria-label="14-day glucose zone history">
		{cells.map((cell, index) => <span className={`spark-${cell}`} key={`${cell}-${index}`}></span>)}
	</div>
);

const StarRank = ({ rank }) => (
	<div className="patients-rank" aria-label={`${rank} priority stars`}>
		{[1, 2, 3].map((star) => <Star key={star} size={12} className={star <= rank ? 'filled' : ''} />)}
	</div>
);

const PatientPreview = ({ patient, onClose }) => {
	if (!patient) return null;
	return (
		<div className="patient-preview-layer" role="dialog" aria-modal="true" aria-label={`${patient.name} preview`}>
			<button type="button" className="patient-preview-backdrop" onClick={onClose} aria-label="Close patient preview"></button>
			<aside className="patient-preview-panel">
				<button type="button" className="patient-preview-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
				<div className="patient-preview-profile"><Image src={patient.avatar} alt="" /><div><span className="patient-category-chip">{patient.category}</span><h2>{patient.name}</h2><p>{patient.phone}</p></div></div>
				<div className="patient-preview-status"><span className={`patient-zone zone-${patient.zoneTone}`}>{patient.zone}</span><span className={`priority-${patient.priority}`}>{patient.priority} priority</span></div>
				<div className="patient-preview-metrics"><div><span>7-day average</span><strong>{patient.average ?? '—'}{patient.average && <small> mg/dL</small>}</strong></div><div><span>Last sync</span><strong>{patient.lastSync}</strong></div><div><span>Educator</span><strong>{patient.educator}</strong></div><div><span>Subscription</span><strong className="text-capitalize">{patient.subscription}</strong></div></div>
				<div className="patient-preview-trend"><p>14-day glucose pattern</p><Sparkline cells={patient.spark} /></div>
				<Link href="/today" className="button-primary">Open in today’s worklist</Link>
			</aside>
		</div>
	);
};

const AddPatientPanel = ({ open, onClose, onAdd }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('+91 ');
	const [category, setCategory] = useState('T');

	if (!open) return null;

	const submit = (event) => {
		event.preventDefault();
		onAdd({
			id: `local-${Date.now()}`, name, phone, category, categoryName: 'New enrolment', educator: 'Unassigned', engagement: 'Active', status: 'active', activeStatus: 'Onboarding', lastSync: 'Not started', missingDays: 0, average: null, zone: 'No data', zoneTone: 'neutral', rank: 0, priority: 'green', subscription: 'never', avatar: '/images/avatar/avatar.jpg', spark: Array(14).fill('none')
		});
		setName('');
		setPhone('+91 ');
		onClose();
	};

	return (
		<div className="patient-preview-layer" role="dialog" aria-modal="true" aria-label="Add patient">
			<button type="button" className="patient-preview-backdrop" onClick={onClose} aria-label="Close add patient panel"></button>
			<aside className="patient-preview-panel add-patient-panel">
				<button type="button" className="patient-preview-close" onClick={onClose} aria-label="Close"><X size={19} /></button>
				<div className="add-patient-heading"><span><UserPlus size={19} /></span><div><p className="eyebrow">New enrolment</p><h2>Add patient</h2></div></div>
				<form onSubmit={submit} className="add-patient-form">
					<label>Full name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Patient name" /></label>
					<label>Phone number<input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91" /></label>
					<label>Monitoring category<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
					<label>Assigned educator<select defaultValue="Unassigned"><option>Unassigned</option><option>Anita Rao</option><option>Neha Singh</option></select></label>
					<div className="add-patient-actions"><button type="button" className="button-secondary" onClick={onClose}>Cancel</button><button type="submit" className="button-primary">Add patient</button></div>
				</form>
			</aside>
		</div>
	);
};

const PatientsBoard = () => {
	const [patients, setPatients] = useState(patientsData);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('active');
	const [engagement, setEngagement] = useState('all');
	const [subscription, setSubscription] = useState('all');
	const [priority, setPriority] = useState('all');
	const [category, setCategory] = useState('all');
	const [missingOnly, setMissingOnly] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [showAddPatient, setShowAddPatient] = useState(false);

	const filteredPatients = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return patients.filter((patient) => {
			if (status !== 'all' && patient.status !== status) return false;
			if (engagement !== 'all' && patient.engagement !== engagement) return false;
			if (subscription !== 'all' && patient.subscription !== subscription) return false;
			if (priority !== 'all' && patient.priority !== priority) return false;
			if (category !== 'all' && patient.category !== category) return false;
			if (missingOnly && patient.missingDays < 2) return false;
			if (!normalizedQuery) return true;
			return patient.name.toLowerCase().includes(normalizedQuery) || patient.phone.replace(/\D/g, '').includes(normalizedQuery.replace(/\D/g, ''));
		});
	}, [patients, query, status, engagement, subscription, priority, category, missingOnly]);

	return (
		<div className="patients-page">
			<div className="page-heading-row patients-heading">
				<div><p className="eyebrow">Care management</p><h1>Patients</h1><p>Search and filter your caseload · open a patient to review their glucose pattern.</p></div>
				<div className="page-actions"><Link href="/today" className="button-secondary">Today →</Link><button type="button" className="button-primary" onClick={() => setShowAddPatient(true)}><Plus size={17} /> Add patient</button></div>
			</div>

			<button type="button" className="patients-lapsed-alert" onClick={() => setStatus('old')}>
				<AlertTriangle size={17} /><span><strong>{patientTotals.lapsed} patients — subscription ended</strong><small>On Old patients until billed again</small></span><em>Review →</em>
			</button>

			<section className="patients-toolbar">
				<label className="patients-search"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or phone…" /></label>
				<div className="patients-selects">
					<label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="active">Active</option><option value="old">Old patients</option><option value="paused">Paused</option><option value="all">All</option></select></label>
					<label><span>Engagement</span><select value={engagement} onChange={(event) => setEngagement(event.target.value)}><option value="all">All</option><option>Active</option><option>Quiet 2d</option><option>Quiet 3d</option><option>Outreach</option><option>Inactive</option></select></label>
					<label><span>Subscription</span><select value={subscription} onChange={(event) => setSubscription(event.target.value)}><option value="all">All</option><option value="active">Active</option><option value="expiring">Expiring ≤7d</option><option value="expired">Expired</option><option value="never">Never subscribed</option></select></label>
					<label><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="all">All</option><option value="red">Red</option><option value="orange">Orange</option><option value="green">Green</option></select></label>
				</div>
			</section>

			<div className="patients-subfilters">
				<div><span>Category:</span><button type="button" onClick={() => setCategory('all')} className={category === 'all' ? 'active' : ''}>All</button>{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''}>{item}</button>)}</div>
				<label><input type="checkbox" checked={missingOnly} onChange={(event) => setMissingOnly(event.target.checked)} /> Missing ≥2 days</label>
			</div>

			<div className="patients-result-line"><span>Showing <strong>{filteredPatients.length}</strong> sample records · {patientTotals.active} active patients</span><span>4 November 2026 IST</span></div>

			{filteredPatients.length > 0 ? (
				<>
					<div className="patients-table-wrap"><table className="patients-table"><thead><tr><th>Patient</th><th>Engagement</th><th>Active</th><th>Last sync</th><th>7d avg</th><th>14d</th><th>Zone</th><th>Rank</th><th>Priority</th><th>Status</th></tr></thead><tbody>{filteredPatients.map((patient) => <tr key={patient.id}>
						<td><button type="button" className="patient-name-cell" onClick={() => setSelectedPatient(patient)}><Image src={patient.avatar} alt="" /><span><strong>{patient.name}<i>{patient.category}</i></strong><small>{patient.educator} · {patient.phone}</small></span></button></td>
						<td><span className={`engagement engagement-${patient.engagement.toLowerCase().replaceAll(' ', '-')}`}>{patient.engagement}</span></td>
						<td><span className="active-state"><i></i>{patient.activeStatus}</span></td>
						<td><span className="last-sync">{patient.lastSync}{patient.missingDays >= 2 && <small>{patient.missingDays}d missing</small>}</span></td>
						<td className="average-cell">{patient.average ?? '—'}</td><td><Sparkline cells={patient.spark} /></td>
						<td><span className={`patient-zone zone-${patient.zoneTone}`}>{patient.zone}</span></td><td><StarRank rank={patient.rank} /></td><td><span className={`patient-priority priority-${patient.priority}`}>{patient.priority}</span></td>
						<td><button type="button" className="patient-row-action" onClick={() => setSelectedPatient(patient)}><MoreHorizontal size={17} /></button></td>
					</tr>)}</tbody></table></div>

					<div className="patient-mobile-list">{filteredPatients.map((patient) => <article className="patient-mobile-card" key={patient.id}><div className="patient-mobile-header"><button type="button" className="patient-name-cell" onClick={() => setSelectedPatient(patient)}><Image src={patient.avatar} alt="" /><span><strong>{patient.name}<i>{patient.category}</i></strong><small>{patient.phone}</small></span></button><span className={`patient-zone zone-${patient.zoneTone}`}>{patient.zone}</span></div><div className="patient-mobile-stats"><div><span>Engagement</span><strong>{patient.engagement}</strong></div><div><span>7d average</span><strong>{patient.average ?? '—'}</strong></div><div><span>Last sync</span><strong>{patient.lastSync}</strong></div></div><Sparkline cells={patient.spark} /><div className="patient-mobile-footer"><StarRank rank={patient.rank} /><button type="button" className="today-review-button" onClick={() => setSelectedPatient(patient)}>Open</button></div></article>)}</div>
				</>
			) : <div className="patients-empty"><Check size={23} /><strong>No patients match these filters</strong><p>Clear one or more filters and try again.</p></div>}

			<PatientPreview patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
			<AddPatientPanel open={showAddPatient} onClose={() => setShowAddPatient(false)} onAdd={(patient) => setPatients((current) => [patient, ...current])} />
		</div>
	);
};

export default PatientsBoard;
