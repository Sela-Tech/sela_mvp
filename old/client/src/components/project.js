import React, {Component} from 'react';
// components
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import { CustomNavLink as CustomLink } from './link';
import Timeline from './projectTimeline';
import SimpleMap from './maps';


export default class Project extends Component {
    componentDidMount(){
       /* this.props.setHeader({
            icon: 'pie_chart',
            title: this.project ? this.project.project_name : 'No Project',
            description: 'Project'
        })*/
    }

    getDefaultDate = () => {
        return this.props.project.start_date;
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
            project = this.props.project;
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
        let {match, project} = this.props;
        return <PageWrapper>
            <TopHeader 
                icon="pie_chart" 
                title={project ? project.name : 'No Project'}
                description="Project" />
            <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <ul className="nav nav-pills nav-justified">
                        <CustomLink to={`${match.url}/timeline`} label="timeline" />
                        <CustomLink to={`${match.url}/locations`} label="locations" />
                    </ul>
                </div>
                <div className="clearfix"></div>
                {this.props.project ? <Switch>
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
        </PageWrapper>
    }
}

const Locations = (props) => (
    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 text-center p-t-24 p-8">
        <SimpleMap
         markers={[[4.658696, 7.269298, 'A']]}/>
    </div>
);