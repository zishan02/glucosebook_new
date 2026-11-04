'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { Calendar, Check, ChevronDown, Clock, Phone, Search, Star } from 'react-feather';
import { todayCalls, todayWorklist } from 'data/today/TodayData';

const filters = [
	{ id: 'all', label: 'All work' },
	{ id: 'logged', label: 'Logged sugar' },
	{ id: 'alert', label: 'Open alerts' },
	{ id: 'plan', label: "Today's plan" },
	{ id: 'priority', label: 'Glucose priority' },
	{ id: 'review', label: 'Flagged in review' }
];

const WorklistRow = ({ patient }) => (
	<article className={`today-patient-row ${patient.reviewed ? 'reviewed' : ''}`}>
		<div className="today-patient-main">
			<Image src={patient.avatar} alt="" className="today-patient-avatar" />
			<div className="today-patient-copy">
				<div className="today-patient-title">
					<Link href="/patients">{patient.name}</Link>
					<span className={`today-zone today-zone-${patient.zoneTone}`}>{patient.zone}</span>
					<span className="today-reading-time"><Clock size={12} /> {patient.time}</span>
					<button type="button" className="today-star" aria-label={`Star ${patient.name}`}><Star size={15} /></button>
				</div>
				{patient.reviewed && <p className="today-reviewed"><Check size={13} /> Reviewed today</p>}
				<p className="today-headline">{patient.headline}</p>
				<div className="today-chip-row">
					{patient.chips.map((chip) => <span key={chip} className={chip.includes('alert') || chip.includes('priority') ? 'urgent' : ''}>{chip}</span>)}
					<span className="educator-chip">→ {patient.educator}</span>
				</div>
			</div>
		</div>
		<div className="today-patient-actions">
			<div className="today-reading">
				<strong>{patient.reading ?? '—'}</strong>
				{patient.unit && <span>{patient.unit}</span>}
			</div>
			<Link href="/patients" className="today-review-button">{patient.reviewed ? 'Open' : 'Review'}</Link>
		</div>
	</article>
);

const CallSection = ({ title, rows }) => (
	<div className="today-call-section">
		<h3>{title} <span>{rows.length}</span></h3>
		{rows.map((row) => (
			<div className="today-call-row" key={row.name}>
				<div><strong>{row.name}</strong><p className={row.urgent ? 'urgent' : ''}>{row.detail} · {row.educator}</p></div>
				<Link href="/patients" aria-label={`Open ${row.name}`}><Phone size={15} /> Open</Link>
			</div>
		))}
	</div>
);

const TodayWorklist = () => {
	const [activeFilter, setActiveFilter] = useState('all');
	const [search, setSearch] = useState('');

	const counts = useMemo(() => filters.reduce((result, filter) => {
		result[filter.id] = filter.id === 'all' ? todayWorklist.length : todayWorklist.filter((patient) => patient.categories.includes(filter.id)).length;
		return result;
	}, {}), []);

	const filteredPatients = useMemo(() => {
		const query = search.trim().toLowerCase();
		return todayWorklist.filter((patient) => {
			const matchesFilter = activeFilter === 'all' || patient.categories.includes(activeFilter);
			const matchesSearch = !query || patient.name.toLowerCase().includes(query);
			return matchesFilter && matchesSearch;
		});
	}, [activeFilter, search]);

	const reviewedCount = todayWorklist.filter((patient) => patient.reviewed).length;
	const completion = 68;

	return (
		<div className="today-page">
			<div className="page-heading-row today-heading">
				<div><p className="eyebrow">Daily care operations</p><h1>Today</h1><p>3 November 2026 (IST) · review who logged sugar, then follow up with patients who stayed silent.</p></div>
				<div className="page-actions"><span className="today-date-chip"><Calendar size={16} /> Tuesday</span><button type="button" className="button-primary" onClick={() => setActiveFilter('alert')}>Review critical</button></div>
			</div>

			<section className="today-focus-grid" aria-label="Today summary">
				<button type="button" onClick={() => setActiveFilter('logged')} className={activeFilter === 'logged' ? 'active' : ''}>
					<span>Logged sugar</span><strong>18</strong><small>6 require review</small>
				</button>
				<button type="button" onClick={() => setActiveFilter('alert')} className={`danger ${activeFilter === 'alert' ? 'active' : ''}`}>
					<span>Critical</span><strong>3</strong><small>2 newly escalated</small>
				</button>
				<button type="button" onClick={() => setActiveFilter('plan')} className={activeFilter === 'plan' ? 'active' : ''}>
					<span>Plan done</span><strong>{completion}%</strong><small>17 of 25 patients</small><i><span style={{ width: `${completion}%` }}></span></i>
				</button>
			</section>

			<section className="today-toolbar">
				<div className="today-filters" aria-label="Worklist filters">
					{filters.map((filter) => <button type="button" key={filter.id} onClick={() => setActiveFilter(filter.id)} className={activeFilter === filter.id ? 'active' : ''}>{filter.label}<span>{counts[filter.id]}</span></button>)}
				</div>
				<label className="today-search"><Search size={16} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patient by name…" /></label>
			</section>

			<div className="today-layout">
				<section className="today-worklist-card">
					<div className="today-section-heading"><div><p className="eyebrow">Prioritized queue</p><h2>Needs attention today</h2></div><span>{filteredPatients.length} patients</span></div>
					{filteredPatients.length > 0 ? <div className="today-patient-list">{filteredPatients.map((patient) => <WorklistRow key={patient.id} patient={patient} />)}</div> : <div className="today-empty"><Check size={22} /><strong>No patients found</strong><p>Try another filter or search term.</p></div>}
				</section>

				<aside className="today-side-column">
					<section className="today-progress-card">
						<div><p className="eyebrow">Your progress</p><h2>Daily review</h2></div>
						<div className="today-progress-value"><strong>{reviewedCount}</strong><span>of {todayWorklist.length} reviewed</span></div>
						<div className="today-progress-track"><span style={{ width: `${Math.round((reviewedCount / todayWorklist.length) * 100)}%` }}></span></div>
						<p>Start with critical alerts, then clear newly logged readings.</p>
					</section>
					<details className="today-call-card" open>
						<summary><span><Phone size={17} /> Call list</span><small>{todayCalls.silent.length + todayCalls.renewals.length} patients</small><ChevronDown size={16} /></summary>
						<div className="today-call-content"><p>Your assigned patients who need outreach today.</p><CallSection title="Not messaging — call" rows={todayCalls.silent} /><CallSection title="Renewing soon" rows={todayCalls.renewals} /></div>
					</details>
				</aside>
			</div>
		</div>
	);
};

export default TodayWorklist;
