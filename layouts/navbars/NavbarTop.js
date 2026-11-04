'use client'

import { Menu, Search } from 'react-feather';
import QuickMenu from 'layouts/QuickMenu';

const NavbarTop = ({ onToggleSidebar, theme, onToggleTheme }) => (
	<header className="app-header">
		<div className="app-header-left">
			<button className="app-icon-button app-menu-button" type="button" onClick={onToggleSidebar} aria-label="Toggle sidebar"><Menu size={20} /></button>
			<label className="app-search" aria-label="Search the workspace">
				<Search size={18} />
				<input type="search" placeholder="Search patients, reports, pages..." />
				<kbd>⌘ K</kbd>
			</label>
		</div>
		<QuickMenu theme={theme} onToggleTheme={onToggleTheme} />
	</header>
);

export default NavbarTop;
