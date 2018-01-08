import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.png';
import './App.css';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import CountUp from 'react-countup';
import Calendar from 'fullcalendar-reactwrapper';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectId: null,
      projects: [],
      fetched: false
    };
  }

  componentDidMount(){
    this.fetchProjects();
  }

  fetchProjects = () => {
    let _self = this;
    
    fetch('/projects').then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function(json) {_self.setState(json); console.log(json);})
    .catch(function(error) {console.log(error);})
    .then(function(){_self.setState({fetched: true})});
  };

  switchProject = (projectId) => {
    /* Changes currently displayed project */
    this.setState({projectId: projectId});
  };

  getDefaultDate(){
    return this.state.projects[this.state.projectId].start_date;
  }

  getMilestones(projectId){
    /*Mocked:: Gets the milestones of a project as Calendar events
    * title -> name
    * start -> first task of event
    * end -> last task of event
    * tasks: [0, 0, 0].map(function(_, j){return {
            start: `2018-0${(i % 8) + 1}-0${j}`,
            end: `2018-0${(i % 8) + 1}-0${j+3}`,
      };}),
    */

    let milestones = [];
    if (!projectId){return milestones;}
    // mocked:: variable to adjust milestones end dates
    let joker = 0;
    for (let i=0; i < 5; i++){
      milestones.push({
        title: `Milestone ${i}`,
        start: this.state.projects[projectId].start_date,
        end: joker++ % 2 ? this.state.projects[projectId].end_date :
          this.state.projects[projectId].start_date,
        status: !!milestones[i] && !milestones[i].status,
      })
    }
    return milestones;
  }

  renderProjects(){
    let projectEls = [],
    _self = this,
    proj;
    Object.keys(this.state.projects).map(function(_id, i){
      proj = _self.state.projects[_id];
      projectEls.push(
        <div onClick={_self.switchProject.bind(_self, _id)} style={{cursor: 'pointer'}} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div className="panel cardbox bg-primary">
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
        </div>);
      if (i + 1 % 4 === 0){
        projectEls.push(<div className="clearfix visible-lg visible-md"></div>);
      }
      return null;
    });
    return projectEls ? React.Children.toArray(projectEls) : '';
  }

  render() {

    return (
      !this.state.fetched ? <div className="col-md-12 text-center">
        <p className="lead">Loading projects...</p>
      </div> :
      !this.state.projectId ? <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
        {this.renderProjects()}
      </div> :
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div className="card">
              <div className="card-content">
                  <Calendar
                     id = "timelineID"
                     header = {{
                      left: 'prev,next today myCustomButton',
                      center: 'title',
                      right: 'month,basicWeek,basicDay'
                    }}
                    defaultDate={this.getDefaultDate()}
                    navLinks= {true} // can click day/week names to navigate views
                    editable= {false}
                    eventLimit= {true} // allow "more" link when too many events
                    events = {this.getMilestones(this.state.projectId)} />                 
              </div>
          </div>
      </div>
    );
  }
}

export default App;
