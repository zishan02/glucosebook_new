import PropTypes from 'prop-types';
import { Activity, Target, TrendingDown, Users } from 'react-feather';

const icons = { activity: Activity, target: Target, 'trending-down': TrendingDown, users: Users };

const StatRightTopIcon = ({ info }) => {
	const Icon = icons[info.icon] || Activity;
	const arrow = info.direction === 'up' ? '↑' : '↓';

	return (
		<article className="metric-card">
			<div className={`metric-icon metric-icon-${info.tone}`}><Icon size={19} /></div>
			<div className="metric-value">{info.value}<span>{info.unit}</span></div>
			<div className="metric-label">{info.label}</div>
			<div className="metric-context"><span className="positive">{info.change} {arrow}</span><span>{info.helper}</span></div>
		</article>
	);
};

StatRightTopIcon.propTypes = { info: PropTypes.object.isRequired };

export default StatRightTopIcon;
