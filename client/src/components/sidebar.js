import React, {Component} from 'react';


class SideBar extends Component {
	render(){
		return <div id="sidebar-wrapper" className="waves-effect" data-simplebar>
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="list-header">Main Navigation ---</li>
                        <li className="active-link"><a href="/index.html"><i className="material-icons">dashboard</i>Dashboard</a></li>
                        <li><a><i className="material-icons">pie_chart</i>Projects</a>
                            <ul className="nav nav-second-level">
                                <li><a href="/projects/all"><i className="material-icons">public</i>public</a></li>
                            </ul>
                        </li>
                        <li className="side-last"></li>
                    </ul>
                </div>
            </div>
        </div>
	}
}

const MenuItem = ({title, icon, children}) => (
	<li><a><i className="material-icons">{icon}</i>{title}</a>
        {children ? <ul className="nav nav-second-level">
            {children}
        </ul> : ''}
    </li>
);

export default SideBar;