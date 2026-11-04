'use client'

import Link from 'next/link';
import { Bell, ChevronDown, Moon, Sun } from 'react-feather';
import { Dropdown, Image } from 'react-bootstrap';

const QuickMenu = ({ theme, onToggleTheme }) => (
	<div className="app-quick-menu">
		<button className="app-icon-button" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
			{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
		</button>
		<Dropdown align="end">
			<Dropdown.Toggle as="button" className="app-icon-button app-notification-button" aria-label="Open notifications">
				<Bell size={19} /><span></span>
			</Dropdown.Toggle>
			<Dropdown.Menu className="app-dropdown notification-menu">
				<div className="app-dropdown-header"><strong>Notifications</strong><span>3 new</span></div>
				<Dropdown.Item as={Link} href="/patients"><strong>High glucose alert</strong><small>James Wilson · 8 minutes ago</small></Dropdown.Item>
				<Dropdown.Item as={Link} href="/devices"><strong>Device disconnected</strong><small>Olivia Martin · 22 minutes ago</small></Dropdown.Item>
				<Dropdown.Item as={Link} href="/messages"><strong>New patient message</strong><small>Noah Brown · 1 hour ago</small></Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
		<Dropdown align="end">
			<Dropdown.Toggle as="button" className="app-profile-toggle">
				<Image src="/images/avatar/avatar-1.jpg" alt="Dr. Maya Patel" />
				<span><strong>Dr. Maya Patel</strong><small>Care coordinator</small></span>
				<ChevronDown size={16} />
			</Dropdown.Toggle>
			<Dropdown.Menu className="app-dropdown profile-menu">
				<Dropdown.Item as={Link} href="/pages/profile">My profile</Dropdown.Item>
				<Dropdown.Item as={Link} href="/pages/settings">Workspace settings</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item href="/authentication/sign-in">Sign out</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</div>
);

export default QuickMenu;
