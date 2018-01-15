import React from 'react';
// components
import {Link, Route} from 'react-router-dom';

const CustomNavLink = ({to, label, icon, activeClassname, children}) => (
	<Route path={to} children={({match}) => (
		<li className={match ? activeClassname || 'active' : ''}>
			{children || <Link to={to} className="text-uppercase">{label}</Link>}
		</li>)}
	/>
);

export {CustomNavLink};