'use client'

import { useEffect, useState } from 'react';
import 'styles/theme.scss';
import NavbarVertical from '/layouts/navbars/NavbarVertical';
import NavbarTop from '/layouts/navbars/NavbarTop';

export default function DashboardLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const savedTheme = window.localStorage.getItem('glucosebook-theme');
		const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		setTheme(savedTheme || preferredTheme);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-bs-theme', theme);
		window.localStorage.setItem('glucosebook-theme', theme);
	}, [theme]);

	return (
		<div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
			<aside className="app-sidebar"><NavbarVertical onNavigate={() => setSidebarOpen(false)} /></aside>
			<button className="app-sidebar-backdrop" type="button" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"></button>
			<div className="app-main">
				<NavbarTop onToggleSidebar={() => setSidebarOpen((open) => !open)} theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
				<main className="app-content">{children}</main>
			</div>
		</div>
	);
}
