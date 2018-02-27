import React, {Component} from 'react';
// components
import { Link } from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import Button from './button';
import FormWrapper, { TextInput, DateInput, SelectInput } from './form';


const ProjectForm = (props) => (
    <FormWrapper {...props} >
        <TextInput required={true} name="projectName" type="text" label="Project name" />
        <TextInput required={true} name="projectDescription" type="text" label="Project description" />
        <DateInput required={true} name="startDate" label="Start date of project" />
        <DateInput required={true} name="endDate" label="End date of project" />
        <TextInput name="location" label="Main location for project" />

        <div className="row text-right">
            <Button 
                type="submit"
                label="continue" 
                btnClass="success" 
                material={true}
                icon="done"
                 />
        </div>
    </FormWrapper>
);


class TaskForm extends Component {
    render() {
        const {addMilestone, successLink, ...props} = this.props;
        return <FormWrapper {...props} getRef={props.getRef} >
            <div className="row text-right">
                <Button 
                    style={styles.headerButton}
                    type="button"
                    onClick={addMilestone} 
                    label="Next Milestone" 
                    btnClass="info" 
                    material={true}
                    icon="done"
                     />
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
            <TextInput required={true} name="taskName" type="text" label="Task name" />
            <TextInput required={true} name="taskDescription" type="text" label="Task description" />
            <DateInput required={true} name="dueDate" label="Due date of task" />

            <div className="row text-right">
                <Button 
                    type="submit"
                    label="Add task" 
                    btnClass="success" 
                    material={true}
                    icon="add"
                     />
            </div>
        </FormWrapper>
    }
}


export default class ProjectCreation extends Component {
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

    createProject = (model) => {
        console.log("Valid submit!");
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
        /*let tasks = projects.items[project._id].milestones.reduce(function (tasks, m) {
            return tasks.concat(milestones.items[m].tasks.map((t) => (_self.props.tasks.items[t])));
        }, []);*/
        
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
        return this.props.project;
    }

    render() {
        
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
                                    <ProjectForm 
                                        onSubmit={() => console.log('Submit!')}
                                        onValidSubmit={this.createProject} 
                                        style={styles.projectForm} />
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card" style={{margin: '0 auto', maxWidth: 500}}>
                                <div className="card-content">
                                    <TaskForm 
                                        getRef={this.getRefTaskForm}
                                        onSubmit={() => console.log('Submit!')}
                                        onValidSubmit={this.createTask}
                                        addMilestone={this.createMilestone}
                                        successLink={`/projects/summary/${this.getProject()._id}`}
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
    headerButton: {
        marginRight: 8
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