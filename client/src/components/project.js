import React, { Component } from 'react';
// components
import { Redirect, Route, Switch } from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import { CustomNavLink as CustomLink } from './link';
import Timeline from './projectTimeline';
import SimpleMap from './maps';
import TasksList from './tasksList';
import TaskDialog from './taskDialog';

export default class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: props.project
        };
    }

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
        /* Get the milestones of a project as Calendar events
        * title: name
        * start: due date of first task in milestone
        * end: due date of last task in milestone
        */
        let { tasks, project } = this.props;
        projectId = projectId || this.props.match.params.id;
        if (!projectId) return [];
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
        return [];
    };

    render(){
        let { isLoading, tasks, loadTasks } = this.props;
        let { project } = this.state;
        return <PageWrapper>
            <TopHeader 
                icon="pie_chart" 
                title={project ? project.project_name : 'No Project'}
                description="Project" />
                <div className="page-content" style={{position: 'relative'}}>
                <div className="row p-24">
                    <div className="clearfix"></div>
                    <div className="col-md-8 col-sm-12 col-xs-12">
                        {project && <TasksList 
                            projectId={project._id} 
                            tasks={tasks}
                            loadTasks={loadTasks}
                            style={styles.tasksList} />}
                    </div>
                    <div className="clearfix"></div>
                    {project && 
                        <Timeline getDefaultDate={this.getDefaultDate} getMilestones={this.getMilestones} />}
                    {project && <Locations project={project} />}
                    {!project && <div class="container-fluid p-t-48 text-center">
                        {isLoading ? 'Loading project...' : 'Project not found'}
                    </div>}
                </div>
            </div>
            <Route path="/projects/details/:id/tasks/:taskId" render={({ match })=>{
                return <TaskDialog task={tasks[match.params.taskId]} />
            }}/>
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
    },
};