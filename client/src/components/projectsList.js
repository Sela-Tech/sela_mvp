import React, {Component} from 'react';
// utils
import {isValidProject} from '../utils';
// components
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import SimpleMap from './maps';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import { CustomNavLink as CustomLink } from './link';
import ProjectTile from './projectTile';
// assets
import '../assets/css/project.css';


export default class ProjectsList extends Component {
	render(){
		let _self = this,
			projectEls = [],
			{ projects } = this.props;

		console.log(projects.items);
		Object.values(projects.items).map(function(proj, i){
	      isValidProject(proj) && projectEls.push(
	        <ProjectTile proj={proj} />);
	      if (projectEls.length % 4 === 0){
	        projectEls.push(<div className="clearfix visible-lg visible-md"></div>);
	      }
	      return null;
	    });
	    return <PageWrapper>
	    	<TopHeader {...this.props.header} />
		    <div className="projects-container"> 
		    	<div className="page-content p-t-24"> 
			    	<div className="col-md-12 p-24">
			    		<Link to="" className="waves-effect waves-light btn indigo">
			              <i className="material-icons left">add</i>new project
			            </Link>
			    	</div>
			    	<div className="clearfix"></div>
			    	{projects.isFetching ? <div className="col-md-12 text-center">
						<p className="lead">Loading projects...</p>
					</div> : <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
				    	{projectEls ? React.Children.toArray(projectEls) : ''}
				    </div>}
				</div> 
			    <div className="bottom-fixed"><ProjectMap /></div>
			</div>
		</PageWrapper>
	}
}

const ProjectMap = () => (
	<SimpleMap
		 markers={[[4.658696, 7.269298, 'A']]}/>
);