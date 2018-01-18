import React, {Component} from 'react';
import {
    Link, 
    Route
} from 'react-router-dom';

class SideBar extends Component {
	render(){
		return <div id="sidebar-wrapper" className="waves-effect" data-simplebar>
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="list-header">Main Navigation ---</li>
                        <MenuItem title="Dashboard" icon="dashboard" to="/dashboard" />
                        <MenuItem title="Projects" icon="pie_chart" to="/projects">
                            <MenuItem title="Public" icon="public" to="/project/all" />
                        </MenuItem>
                        <li className="side-last"></li>
                    </ul>
                </div>
            </div>
        </div>
	}
}

const MenuItem = ({title, to, icon, children}) => (
	<Route path={to} children={({match}) => (
        <li className={match ? 'active-link' : ''}>
            {children ? <Link to={to}><i className="material-icons">{icon}</i>{title}</Link>
                : <a href="javascript:void(0)"><i className="material-icons">{icon}</i>{title}</a>}
            {children ? <ul className="nav nav-second-level">{children}</ul> : ''}
        </li>)} />
);

export default SideBar;
export {MenuItem};