import React, {Component} from 'react';
// components
import { Link } from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import Button from './button';
import FormWrapper, { TextInput, DateInput, SelectInput } from './form';
// containers
import ProjectCreation from '../containers/projectCreation'
import TaskCreation from '.../containers/taskCreation'
import MilestoneCreation from '../containers/milestoneCreation';




export default class ProjectWizard extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: "project",
            milestone: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        // when new project is saved, create a new default milestone
        !this.props.project ? 
            nextProps.project && this.props.createMilestone({projectId: nextProps.project._id}) :
            // when project info is updated, switch to task form
            this.props.projects.items[nextProps.project._id] !== nextProps.projects.items[nextProps.project._id] ?
                this.setState({ 
                    stage: 'task',
                    milestone: nextProps.projects.items[nextProps.project._id] ?
                    nextProps.projects.items[nextProps.project._id].milestones.length : 1}) :
        //  when task stage is saved, reset taskform
        // todo: store newTask at component level state and make this a callback of
        // an CREATE_TASK_SUCCESS action
        nextProps.tasks.newTask &&
        (!this.props.tasks.newTask || 
            (this.props.tasks.newTask._id !== nextProps.tasks.newTask._id)) &&
        this.taskForm && this.taskForm.reset();
    }

    getMilestoneId() {
        let m = this.props.milestones.newMilestone,
            { project, projects } = this.props;
        return m._id;
    }

    updateProject = (model) => {
        console.log("Valid submit! Updating...")
    };

    createProject = (model) => {
        console.log("Valid submit! Creating...");
        this.props.createProject(model);
    };

    createMilestone = () => {
        console.log("New milestone!");
        this.props.createMilestone({projectId: this.props.project._id});
        this.taskForm && this.taskForm.reset();
    };

    createTask = (model) => {
        console.log("Valid submit!");
        this.props.createTask(Object.assign({
            milestoneId: this.getMilestoneId()
        }, model));
    };

    getHeader() {
        let { project } = this.props;
        return this.state.stage === 'project' ? 
            {
                title: project ? project.project_name : 'New Project',} :
            {
                title: `Milestone ${this.state.milestone}`,
                description: `Project: ${project && project.project_name}`}
                    
    }

    getRefTaskForm = (el) => {
        this.taskForm = el;
    };

    getTasks() {
        let _self = this;
        let { project, projects, milestones, tasks } = this.props;
        let m = milestones.newMilestone._id;
        
        return <div style={styles.tasksList}>
            {React.Children.toArray(Object.values(tasks.items).filter(t => t.milestone === m).map(function(t) {
                    return <div className="card cyan darken-2 white-text">
                        <div className="card-content">
                            {t.task_name}
                        </div>
                    </div>
                })
            )}
        </div>
    }

    getProject() {
        return Object.assign({ _id: this.props.match.params.id }, this.state.project);
    }

    getMilestone() {
        return this.state.milestone
    }

    setProject(project) {
        this.setState({ project });
    }

    setMilestone(milestone) {
        this.setState({ milestone });
    }

    render() {
        const successLink = `/projects/summary/${this.getProject()._id}`;
        return <PageWrapper>
            <TopHeader 
                icon="pie_chart"
                description="Public Project"
                {...this.getHeader()} />
            <div className="page-content" style={styles.container}>
                {this.state.stage === 'project' ?
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card" style={{margin: '0 auto', maxWidth: 500}}>
                                <div className="card-content">
                                    <ProjectCreation
                                        getProject={this.setProject}
                                        style={styles.projectForm} />
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card" style={{margin: '0 auto', maxWidth: 500}}>
                                <div className="card-content">
                                    <div className="row text-right">
                                        <MilestoneCreation getMilestone={this.setMilestone} >
                                            <Button 
                                                style={styles.headerButton}
                                                type="button"
                                                label="Next Milestone" 
                                                btnClass="info" 
                                                material={true}
                                                icon="done"
                                                />
                                        </MilestoneCreation>
                                        <Link to={successLink}>
                                            <Button
                                                type="button"
                                                label="Finish" 
                                                btnClass="info" 
                                                material={true}
                                                icon="done_all"
                                                 />
                                        </Link>
                                    </div>
                                    <TaskCreation
                                        getRef={this.getRefTaskForm}
                                        onSubmit={() => console.log('Submit!')}
                                        style={{maxWidth: 300}} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {this.getTasks()}
                        </div>
                    </div>}
            </div>
        </PageWrapper>
    }
}

const styles = {
    container: {
        padding: 16
    },
    projectForm: {
        margin: '0 auto',
        maxWidth: 300,
    },
    tasksList: {
        height: 300,
        maxWidth: 300,
        overflow: 'auto'
    }
}