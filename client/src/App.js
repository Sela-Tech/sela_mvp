import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      projectId: null,
    };
  }

  switchProject = () => {
    this.setState({projectId: 1});
  };

  render() {
    return (
      !this.state.projectId ? <div onClick={this.switchProject} class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div class="panel cardbox bg-primary">
                <div class="panel-body card-item panel-refresh">
                    <div><span class="timer" data-to="50" data-speed="1500">50</span><small>%</small></div>
                    
                    <div class="cardbox-icon">
                        <i class="material-icons">visibility</i>
                    </div>
                    <div class="card-details">
                        <h4>My-Project</h4>
                        <span class="label label-success">In progress</span>
                    </div>
                </div>
            </div>
        </div>
      </div> :
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="card">
              <div class="card-header">
                  <i class="fa fa-list fa-lg"></i>
                  <h2>{"Milestones"}</h2>
              </div>
              <div class="card-content">
                  
                  <ul class="activity-list list-unstyled">
                      
                      <li class="activity-success">
                          <span class="label label-success green"><i class="fa fa-clock-o"></i> {"6 months ago"}</span>
                          <p class="text-darken-1">{"Milestone 1"}</p>
                          <ul class="activity-list list-unstyled">
                      
                            <li class="activity-success">
                                <span class="label label-success green"><i class="fa fa-clock-o"></i> {"6 months ago"}</span>
                                <p class="text-darken-1">{"Task 1 of Milestone 1"}</p>
                            </li>
                          </ul>
                      </li>
                      <li class="activity-primary">
                          <span class="label label-default teal"><i class="fa fa-clock-o"></i> {"May 2018"}</span>
                          <p class="text-darken-1">{"Milestone 2"}</p>
                      </li>
                      <li>
                          <span class="label label-default indigo"><i class="fa fa-clock-o"></i> {"June 2018"}</span>
                          <p>{"Milestone 3"}</p>
                      </li>

                  </ul>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
