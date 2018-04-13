import React, {Component} from 'react';
// components
import { Link } from 'react-router-dom';
import PageWrapper from './pagewrapper';
import { TopHeader } from './appbar';
import Button from './button';
// containers
import ProjectCreation from '../containers/projectCreation'
import TaskCreation from '../containers/taskCreation'
import MilestoneCreation from '../containers/milestoneCreation'
import ContractorCreation from '../containers/contractorCreation'


export default class ProjectWizard extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: 0,
            project: null,
            tasks: [],
            milestones: []
        };
    }

    next() {
        this.setState((state) => {
            const { stage, milestones } = state;
            return stage < milestones.length || stage === 0 ?
                { stage: stage + 1 } :
                {};
        })
    }

    previous() {
        this.setState((state) => {
            return state.stage > 0 ?
                { stage: state.stage - 1 } :
                {};
        })
    }

    getHeader() {
        let { project, stage } = this.state;
        return stage === 0 ? 
            { title: project ? project.project_name : 'New Project' } :
            {
                title: `Milestone ${stage}`,
                description: `Project: ${project && project.project_name}`
            }
                    
    }

    getRefTaskForm = (el) => {
        this.taskForm = el;
    };

    getTasks() {
        const { milestones, stage, tasks } = this.state;
        return <div style={styles.tasksList}>
            {tasks && React.Children.toArray(
                tasks.filter(t => t.milestone === milestones[stage - 1]._id)
                .map(function(t) {
                    return <div className="card cyan darken-2 white-text">
                        <div className="card-content">
                            {t.task_name}
                            <ContractorCreation 
                                taskId={t._id}
                                style={styles.projectForm} />
                        </div>
                    </div>
                })
            )}
        </div>
    }

    getMilestoneId() {
        const { milestones, stage } = this.state;
        console.log('Milestones:', milestones);
        return milestones.length > 0 && milestones[stage - 1]._id;
    }

    getProject() {
        return this.state.project;
    }

    onProjectSave = (project) => {
        this.setProject(project);
        this.next();
    };

    onMilestoneSave = (milestone) => {
        this.addMilestone(milestone);
        this.next();
    };

    onTaskSave = (task) => {
        this.addTask(task);
        this.taskForm.reset();
    };

    setProject = (project) => {
        this.setState({ project });
    };

    addMilestone = (milestone) => {
        this.setState({ milestones: this.state.milestones.concat([ milestone ]) });
    };

    addTask = (task) => {
        this.setState({
            tasks: this.state.tasks.concat([ task ]),
        })
    };

    render() {
        const { milestones, stage } = this.state;
        const successLink = `/projects/summary/${this.getProject() && this.getProject()._id}`;
        return <PageWrapper>
            <TopHeader 
                icon="pie_chart"
                description="Public Project"
                {...this.getHeader()} />
            <div className="page-content" style={styles.container}>
                {stage === 0 ?
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card" style={{margin: '0 auto', maxWidth: 500}}>
                                <div className="card-content">
                                    <ProjectCreation
                                        onProjectSave={this.onProjectSave}
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
                                        {stage === milestones.length ? 
                                            <MilestoneCreation 
                                                project={this.getProject()}
                                                onMilestoneSave={this.onMilestoneSave} >
                                                <Button 
                                                    style={styles.headerButton}
                                                    type="button"
                                                    label="Next Milestone" 
                                                    btnClass="info" 
                                                    material={true}
                                                    icon="send"
                                                    />
                                            </MilestoneCreation> :
                                        stage > milestones.length ?
                                            <MilestoneCreation 
                                                project={this.getProject()}
                                                onMilestoneSave={this.onMilestoneSave} >
                                                <Button 
                                                    style={styles.headerButton}
                                                    type="button"
                                                    label="Create Milestone" 
                                                    btnClass="success" 
                                                    material={true}
                                                    icon="add_circle_outline"
                                                    />
                                            </MilestoneCreation> :
                                            <Button 
                                                style={styles.headerButton}
                                                type="button"
                                                onClick={this.next}
                                                label="Next Milestone" 
                                                btnClass="info" 
                                                material={true}
                                                icon="send"
                                                />
                                        }    
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
                                        onTaskSave={this.onTaskSave}
                                        milestoneId={this.getMilestoneId()}
                                        onSubmit={() => console.log('Submit!')}
                                        disabled={stage > milestones.length}
                                        style={styles.projectForm} />
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