// libraries
import React, { Component } from 'react';
// components
// import { CSSTransitionGroup } from 'react-transition-group';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// containers
import FilteredProjectsList from './containers/filteredProjectsList';
import Project from './containers/project';
import Login from './containers/userLogin';
import Signup from './containers/userSignup';
// presentational
import AppBar from './components/appbar';
import SideBar from './components/sidebar';
import Dashboard from './components/dashboard';
import ProjectsOverview from './components/projects_overview';
import ProjectWizard from './components/projectWizard';

// assets
// import loading from './assets/img/loading.png';
import './assets/css/App.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';


// wrap <Route> and use this component everywhere instead, then when
// sub routes are added to any route it'll just work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props}
      header={route.header}
      routes={route.routes}/>
  )}/>
);


class App extends Component {

  componentDidMount(){
    // this.fetchProjects();
    // set authenticated user
    // window._SELA_USER ? this.setState({user: window._SELA_USER}) : this.fetchUser();
  }

  render() {
    console.log('Router basename:', process.env.CLIENT_BASE);
    return <Router basename={process.env.CLIENT_BASE || "/client"}>
      <div id="wrapper">
        <AppBar />
        <SideBar />
        <Switch>
          {React.Children.toArray(routes.map((route) => (
            <RouteWithSubRoutes {...route} />
          )))}
          <Redirect to="/projects/all" />
        </Switch>
      </div>
    </Router>
  }
}

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
  { 
    path: '/projects/all',
    component: FilteredProjectsList,
    header: {
      icon: 'pie_chart',
      title: 'Projects',
      description: 'A list of all public projects on SELA',
    }
  },
  { path: '/projects/summary/:id',
    component: Project
  },
  {
    path: '/projects/new',
    component: ProjectWizard,
  },
  {
    path: '/projects/new/:id',
    component: ProjectWizard,
  },
  { path: '/dashboard/updates',
    component: Dashboard,
    header: {
      icon: 'dashboard',
      title: 'Dashboard',
      description: 'Summary of your account activity'
    },
  },
  { path: '/dashboard/overview',
    component: ProjectsOverview,
  }
];


export default App;
