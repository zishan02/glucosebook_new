'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { DashboardMenu } from 'routes/DashboardRoutes';

const NavbarVertical = ({ onNavigate }) => {
	const pathname = usePathname();

	return (
		<div className="app-sidebar-inner">
			<Link href="/" className="app-brand" onClick={onNavigate} aria-label="Glucosebook dashboard">
				<span className="app-brand-mark" aria-hidden="true"><span></span><span></span></span>
				<span>Glucose<span>book</span></span>
			</Link>
			<SimpleBar className="app-sidebar-scroll">
				<nav className="app-navigation" aria-label="Primary navigation">
					{DashboardMenu.map((group) => (
						<div className="app-nav-group" key={group.title}>
							<p className="app-nav-heading">{group.title}</p>
							<ul>
								{group.items.map((item) => {
									const isActive = pathname === item.link;
									return (
										<li key={item.name}>
											<Link href={item.link} className={`app-nav-link ${isActive ? 'active' : ''}`} onClick={onNavigate} aria-current={isActive ? 'page' : undefined}>
												<i className={`fe fe-${item.icon}`} aria-hidden="true"></i>
												<span>{item.name}</span>
												{item.badge && <span className="app-nav-badge">{item.badge}</span>}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>
			</SimpleBar>
			<div className="app-sidebar-help">
				<div className="app-sidebar-help-icon"><i className="fe fe-zap"></i></div>
				<strong>Extend your workspace</strong>
				<p>Add a route, register it in the menu, and compose existing modules.</p>
				<Link href="/documentation">View guide</Link>
			</div>
		</div>
	);
};

export default NavbarVertical;
