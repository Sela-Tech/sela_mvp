import React from 'react';
// components
import {Link, Route} from 'react-router-dom';

export const CustomNavLink = ({to, label, icon, activeClassname, children}) => (
	<Route path={to} children={({match}) => (
		<li className={match ? activeClassname || 'active' : ''}>
			{children || <Link to={to} className="text-uppercase">{label}</Link>}
		</li>)}
	/>
);

/*export const CustomLink = ({to, label}) => (
    <Route path={to} children={({match}) => (
        <li className={match ? 'active' : ''}>
            <Link to={to} className="text-uppercase">{label}</Link>
        </li>)}
    />
);
*/