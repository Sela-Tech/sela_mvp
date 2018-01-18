import React, {Component} from 'react';
// utils
import {isValidProject} from '../utils';
// components
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import CountUp from 'react-countup';
import Calendar from 'fullcalendar-reactwrapper';
import {VectorMap} from 'react-jvectormap';
import SimpleMap from './maps';

// assets
import '../assets/css/project.css';


const CustomLink = ({to, label}) => (
	<Route path={to} children={({match}) => (
		<li className={match ? 'active' : ''}>
			<Link to={to} className="text-uppercase">{label}</Link>
		</li>)}
	/>
);

const ProjectTile = ({...props, proj}) => (
	<div {...props}  className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
		<Link to={`/projects/summary/${proj._id}`}>
	        <div className="panel cardbox bg-primary" style={{cursor: 'pointer'}}>
	            <div className="panel-body card-item panel-refresh">
	                <span className="timer"><CountUp start={0} end={50} suffix="%" /></span>
	                
	                <div className="cardbox-icon">
	                    <i className="material-icons">visibility</i>
	                </div>
	                <div className="card-details">
	                    <h4>{proj.project_name}</h4>
	                    <span className="label label-success">In progress</span>
	                </div>
	            </div>
	        </div>
        </Link>
    </div>
);


class AllProjects extends Component {
	getState(){
		return this.props.parentState;
	}

	render(){
		let _self = this,
			projectEls = [],
			proj;
		Object.keys(this.getState().projects).map(function(_id, i){
	      proj = _self.getState().projects[_id];
	      isValidProject(proj) && projectEls.push(
	        <ProjectTile proj={proj} />);
	      if (projectEls.length % 4 === 0){
	        projectEls.push(<div className="clearfix visible-lg visible-md"></div>);
	      }
	      return null;
	    });
	    return <div className="projects-container"> 
	    	<div className="page-content p-t-24"> 
		    	<div className="col-md-12 p-24">
		    		<Link to="" className="waves-effect waves-light btn indigo">
		              <i className="material-icons left">add</i>new project
		            </Link>
		    	</div>
		    	<div className="clearfix"></div>
		    	{!this.getState().fetched ? <div className="col-md-12 text-center">
					<p className="lead">Loading projects...</p>
				</div> : <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
			    	{projectEls ? React.Children.toArray(projectEls) : ''}
			    </div>}
			</div> 
		    <div className="bottom-fixed"><ProjectMap /></div>
		</div>
	}
}

class Project extends Component {
	componentDidMount(){
		this.setProject();
		this.props.setHeader({
			icon: 'pie_chart',
			title: this.project ? this.project.project_name : 'No Project',
			description: 'Project'
		})
	}

	getState(){
		return this.props.parentState;
	}

	setProject = () => {
		this.project = this.getState().projects[this.props.match.params.id]; 
	};

	getDefaultDate = () => {
		return this.project && this.project.start_date;
	};

	getMilestones = (projectId) => {
		/*Mocked:: Gets the milestones of a project as Calendar events
		* title -> name
		* start -> first task of event
		* end -> last task of event
		* tasks: [0, 0, 0].map(function(_, j){return {
		        start: `2018-0${(i % 8) + 1}-0${j}`,
		        end: `2018-0${(i % 8) + 1}-0${j+3}`,
		  };}),
		*/

		let milestones = [],
			project;
		projectId = projectId || this.props.match.params.id;
		if (!projectId){return milestones;}
		// mocked:: variable to adjust milestones end dates
		let joker = 0;
		for (let i=0; i < 5; i++){
			project = this.getState().projects[projectId];
			project && milestones.push({
				title: `Milestone ${i}`,
				start: project.start_date,
				end: joker++ % 2 ? project.end_date : project.start_date,
				status: !!milestones[i] && !milestones[i].status,
			})
		}
		return milestones;
	};

	render(){
		let {match} = this.props;
		return <div className="row">
			<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
				<ul className="nav nav-pills nav-justified">
					<CustomLink to={`${match.url}/timeline`} label="timeline" />
					<CustomLink to={`${match.url}/locations`} label="locations" />
				</ul>
			</div>
			<div className="clearfix"></div>
			{this.project ? <Switch>
					<Route path={`${match.path}/timeline`}>
						<Timeline getDefaultDate={this.getDefaultDate} getMilestones={this.getMilestones} />
					</Route>
					<Route path={`${match.path}/locations`} >
						<Locations project={this.project} />
					</Route>
					<Redirect from={match.path} to={`${match.url}/timeline`} />
				</Switch> : 
				<div class="col-lg-8 col-md-8 text-center text-uppercase lead p-t-48">
					Project not found
				</div>}
			
			
		</div>
	}
}

const Timeline = (props) => (
	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 p-t-24 p-8">
	  <div className="card">
	      <div className="card-content">
	          {props.getDefaultDate() && <Calendar
	           id = "timelineID"
	           header = {{
	            left: 'prev,next today myCustomButton',
	            center: 'title',
	            right: 'month,basicWeek,basicDay'
	            }}
	            themeSystem="bootstrap3"
	            defaultDate={props.getDefaultDate()}
	            navLinks= {true} // can click day/week names to navigate views
	            editable= {false}
	            eventLimit= {true} // allow "more" link when too many events
	            events = {props.getMilestones()}
	            />}                 
	      </div>
	  </div>
	</div>
);

const Locations = (props) => (
	<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 text-center p-t-24 p-8">
		<VectorMap map={'world_mill'}
           backgroundColor="#3b96ce"
           containerStyle={{
               width: '100%',
               height: 500
           }}
           containerClassName="map" 
           markers={[{latLng: [4.658696, 7.269298], label: 'Loc1'}]}/>
    </div>
);

const ProjectMap = () => (
	<SimpleMap
		 markers={[[4.658696, 7.269298, 'A']]}/>
);

export {AllProjects, Project};