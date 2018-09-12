import React, {Component} from 'react';
// assets
import logo from '../assets/img/logo3.png';
import avatar from '../assets/img/avatar5.png';


class AppBar extends Component {
	render(){
		return <nav className="navbar navbar-inverse navbar-fixed-top">
            <a className="navbar-brand pull-left" href="index.html">
                <img src={logo} alt="logo" style={{width: 61}} />
            </a>
            <a id="menu-toggle">
                <i className="material-icons">apps</i>
            </a>
            <div className="navbar-custom-menu">
                
                <ul className="navbar navbar-right">
                    {/*Notifications goes here*/}
                    {this.props.children}
                    <ProfileMenu />
                </ul>
                <SearchBar />
            </div>
        </nav>
	}
}

const ProfileMenu = () => (
	<li className="dropdown">
	    <a className='dropdown-button user-pro' href='#' data-activates='dropdown-user'>
	        <img src={avatar} className="img-circle" height="45" width="50" alt="User" />
	    </a>
	    <ul id='dropdown-user' className='dropdown-content'>
	        <li>
	            <a href="#!"><i className="material-icons">perm_identity</i> View profile</a>
	        </li>
	        <li>
	            <a href="#!"><i className="material-icons">settings</i> Settings</a>
	        </li>
	        <li>
	            <a href="#!"><i className="material-icons">lock</i> Logout</a>
	        </li>
	    </ul>
	</li>
);

const SearchBar = () => (
	<ul className="nav navbar-nav navbar-right hidden-xs">
        <li className="top-search "><a href="#search"><i className="material-icons">search</i></a></li>
        <li>
            <div id="search" className="top-search">
                <button type="button" className="close">x</button>
                <form>
                    <input type="search" placeholder="type For searching..." />
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
        </li>
    </ul>
);

const MenuItem = ({title, icon, children}) => (
	<li><a href="javascript:void(0)"><i className="material-icons">{icon}</i>{title}</a></li>
);

const TopHeader = ({title, icon, description}) => (
  <section className="content-header">
      <div className="header-icon">
          <i className="material-icons">{icon}</i>
      </div>
      <div className="header-title">
          <h1> {title}</h1>
          <small>{description}</small>
      </div>
  </section>
);

export default AppBar;
export {TopHeader};