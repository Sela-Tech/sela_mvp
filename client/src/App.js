// libraries
import React, { Component } from 'react';
// components
// import { CSSTransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import {AllProjects, Project} from './components/project';
import AppBar from './components/appbar';
import SideBar from './components/sidebar';
// assets
import loading from './loading.png';
import './App.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

const PROJECT_ENDPOINT = '/api/v1/project.json';
const USER_ENDPOINT = '/api/v1/user.json';

const fetchJson = (url) => {
    return fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
};

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} 
      setHeader={route.setHeader}
      header={route.header}
      parentState={route.parentState} 
      routes={route.routes}/>
  )}/>
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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectId: null,
      projects: [],
      fetched: false,
      header: {
        icon: 'dashboard',
        title: 'Dashboard',
        description: 'Summary of your account activity'
      },
      user: null,
    };
  }

  componentDidMount(){
    this.fetchProjects();
    // set authenticated user
    window._SELA_USER ? this.setState({user: window._SELA_USER}) : this.fetchUser();
  }

  fetchUser = (cb) => {
    let _self = this;
    cb = cb || (() => {});

    fetchJson(USER_ENDPOINT)
    .then(function(json) {
      _self.setState((state) => {cb(json.user); return json}); 
      console.log(json);
    })
    .catch(function(error) {console.log(error); cb();})
  };

  fetchProjects = () => {
    /* Fetches authorized projects if a user is authentified. Only public projects otherwise.*/
    let _self = this;
    
    fetchJson(PROJECT_ENDPOINT)
    .then(function(json) {_self.setState(json); console.log(json);})
    .catch(function(error) {console.log(error);})
    .then(function(){_self.setState({fetched: true})});
  };

  switchProject = (projectId) => {
    /* Changes currently displayed project */
    this.setState({projectId: projectId});
  };

  setHeader = (header) => {
    this.setState({header: header});
  };

  render() {
    let _self = this;
    return <Router>
      <div id="wrapper">
        <AppBar>
          <li>
            <Link to="" className="waves-effect waves-light btn indigo">
              <span class="material-icons left">add</span>create
            </Link>
          </li>
        </AppBar>
        <SideBar />
        <div id="page-content-wrapper">
          <div className="page-content">
              <TopHeader {...this.state.header} />
              <div className="container-fluid">
                  <div className="row">
                      {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i}
                          parentState={_self.state}
                          setHeader={_self.setHeader}
                          switchProject={_self.switchProject}
                          {...route} />
                      ))}
                  </div>
              </div>
            
          </div>
        </div>
      </div>
    </Router>
  }
}

const routes = [
  { path: '/projects/all',
    component: AllProjects,
    header: {
      icon: 'pie_chart',
      title: 'Projects',
      description: 'A list of all public projects on SELA',
    }
  },
  { path: '/projects/summary/:id',
    component: Project
  },
];


export default App;
