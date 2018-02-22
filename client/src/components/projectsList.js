import React, { Component } from 'react';
// utils
import { isValidProject } from '../utils';
// components
import { Link } from 'react-router-dom';
import SimpleMap from './maps';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import ProjectTile from './projectTile';
import Button from './button';
// assets
import '../assets/css/project.css';


export default class ProjectsList extends Component {
	
	componentDidMount(){
		this.props.loadProjects();
	}

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
			    	<div className="col-md-12 p-24 text-right">
			    		<Link to="/projects/new">
			              <Button 
			              	label="new project"
			              	icon="fa fa-plus"
			              	btnClass="info btn-large"
			              	style={{margin: 16, position: 'fixed', right: 0, top: 60}} />
			            </Link>
			    	</div>
			    	<div className="clearfix"></div>
			    	{projects.isFetching ? <div className="col-md-12 text-center">
						<p className="lead">Loading projects...</p>
					</div> : <div className="col-md-12 col-sm-12 col-xs-12">
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