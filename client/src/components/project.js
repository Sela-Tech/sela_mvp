import React, { Component } from 'react';
// components
import { Redirect, Route, Switch } from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import { CustomNavLink as CustomLink } from './link';
import Timeline from './projectTimeline';
import SimpleMap from './maps';


export default class Project extends Component {
    componentWillReceiveProps(nextProps) {
        nextProps.project !== this.props.project &&
        this.setState({project: nextProps.project});
    }

    componentDidMount() {
        this.props.loadProjects();
        this.props.loadMilestones();
        this.props.loadTasks();
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
           { tasks, project } = this.props;
        projectId = projectId || this.props.match.params.id;
        if (!projectId){return milestones;}
        if (project.milestones){
            let i = 0;
            console.log('milestones of project:', this.props.milestones);
            return this.props.milestones.reduce((events, m) => {
                console.log('tasks', tasks);
                let _tasks = Object.values(tasks).filter((t) => t.milestone === m._id);
                if (!_tasks[0]) { return events; }
                let eventTasks = events.concat(_tasks.map((t) => ({
                        title: t.task_name,
                        start: project.start_date.match(/^([0-9]+-[0-9]+-[0-9]+)/)[0],
                        end:   t.due_date.match(/^([0-9]+-[0-9]+-[0-9]+)/)[0],
                    })
                ));
                _tasks.sort((t1, t2) => (new Date(t1.due_date) < new Date(t2.due_date) ? -1 : 1));
                eventTasks.push({
                    title: `Milestone ${++i}`,
                    start: _tasks[0].due_date.match(/^([0-9]+-[0-9]+-[0-9]+)/)[0],
                    end: _tasks[_tasks.length - 1].due_date.match(/^([0-9]+-[0-9]+-[0-9]+)/)[0],
                    status: m.status,
                    backgroundColor: 'orange'
                });
                console.log('events:', eventTasks);
                return eventTasks;
            }, []);
        }
        // mocked:: variable to adjust milestones end dates
        let joker = 0;
        for (let i=0; i < 5; i++){
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
        let {match, project, isLoading} = this.props;
        return <PageWrapper>
            <TopHeader 
                icon="pie_chart" 
                title={project ? project.project_name : 'No Project'}
                description="Project" />
                <div className="page-content" style={{position: 'relative'}}>
                <div className="row p-24">
                    <div className="clearfix"></div>
                    {project && 
                        <Timeline getDefaultDate={this.getDefaultDate} getMilestones={this.getMilestones} />}
                    {project && <Locations project={this.project} />}
                    {!project && <div class="container-fluid p-t-48 text-center">
                        {isLoading ? 'Loading project...' : 'Project not found'}
                    </div>}
                </div>
            </div>
        </PageWrapper>
    }
}

const Locations = (props) => (
    <div style={styles.mapContainer}>
        <SimpleMap
         style={styles.map}   
         markers={[[4.658696, 7.269298, 'A']]}/>
    </div>
);

const styles = {

    mapContainer: {
        height: 500,
        maxWidth: 300,
        maxHeight: 500,
        minHeight: 400,
        position: 'fixed',
        right: 25,
        top: 160,
        width: '40%',
    },
    map: {
        height: '100%',
        maxHeight: 400,
    }
};