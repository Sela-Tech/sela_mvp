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
// assets
import logo from './logo.svg';
import loading from './loading.png';
import './App.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

const PROJECTS_ENDPOINT = '/api/v1/projects.json';

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
      }
    };
  }

  componentDidMount(){
    this.fetchProjects();
  }

  fetchProjects = () => {
    let _self = this;
    
    fetch(PROJECTS_ENDPOINT).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
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
