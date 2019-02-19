import React from "react";
import AStyle from "./a.styles";
import moment from "moment";
import { Link } from "react-router-dom";
import BarChartComp from "./bar";
import PieChartComp from "./pie";

import { Line } from "rc-progress";
import { BarChart, Bar } from "recharts";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

import Chance from 'chance';

var chance = new Chance();

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      date: "",
      taskData: [],
      pie: [
        { name: "Group A", value: chance.integer({ min: 0, max: 500 }) },
        { name: "Group B", value: chance.integer({ min: 0, max: 500 }) },
        { name: "Group D", value: chance.integer({ min: 0, max: 500 }) },
      ],
      inDate: moment()
    };
  }

  componentWillMount() {
    if (this.props.tasks) {
      this.setState({
        taskData: this.props.tasks.map(t => {
          return {
            name: t.name,
            uv: 0,
            pv: 0,
            amt: 0
          };
        })
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        taskData: nextProps.tasks.map(t => {
          return {
            name: t.name,
            uv: 0,
            pv: 0,
            amt: 0
          };
        })
      });
    }
  }

  handleDateUpdate = e => this.setState({ date: e.target.value });

  render() {
    const { date, pie } = this.state;

    let temp = {
      project_completion: chance.integer({ min: 0, max: 100 }),
      project_increase_rate: chance.integer({ min: 0, max: 50 }),
      tasks_completed: chance.integer({min:20, max: 60 }),
      total_tasks: chance.integer({min:60, max: 300 }),
      tasks_completion_rate:  chance.integer({ min: 0, max: 50 }),
      budget_exhausted: chance.integer({min: 10,max: 85}),
      budget_exhaustion_rate: chance.integer({min: 5, max: 60}),
      spent: chance.dollar({min: 90000, max: 900000}),
      paid: chance.dollar({min: 30000, max: 90000}),
      
      spending_rate: chance.integer({min: 0, max: 60}),
      
    }

    temp.percentage_task_completed=  Math.floor((temp.tasks_completed * 100)/temp.total_tasks)
      
    temp.taskData = Array.from({ length: temp.tasks_completed }).map((x,i)=>{
      return {
          name: "Task" + i,
          uv: chance.integer({ min: 0, max: 50 }),
          pv: chance.integer({ min: 0, max: 50 }),
          amt: chance.integer({ min: 0, max: 50 }),
        };
    })
    
    temp.spendData =  Array.from({ length: temp.tasks_completed }).map((x,i)=>{
      return {
          name: "Task" + i,
          uv: chance.integer({ min: 0, max: 50 }),
          pv: chance.integer({ min: 0, max: 50 }),
          amt: chance.integer({ min: 0, max: 50 }),
        };
    })

    const months = ['Jan','Feb','Mar']
    temp.spentVsRaised = Array.from({ length: 9 }).map((x,i)=>{
      let formatted = parseFloat(temp.paid.replace("$",""))
      return {
          name: months[i],
          spent: i === 8 ? formatted :chance.integer({ min: 0, max: formatted }),
          raised: i % chance.integer({min:2,max: 8}) === 0 ? 0 : chance.integer({ min: (formatted - formatted / 3) , max: formatted }),
        };
    })

    let id = this.props.match.params.id;

    if(id === "5c6ac73943a7550022127075"){
      temp.project_completion = 6; 
      temp.project_increase_rate = 1.25;
      temp.percentage_task_completed = 50;
      temp.total_tasks = 4;
      temp.budget_exhausted = +(100 - (((750000 - 124760)/750000) * 100)).toFixed(2);
      temp.budget_exhaustion_rate = 0;
      temp.paid = 124760;
      temp.spending_rate =0;
      temp.spent = 0;
      temp.tasks_completed = 2;
      temp.tasks_completion_rate = 67;
      temp.spentVsRaised = Array.from({ length: 9 }).map((x,i)=>{
        // let formatted = parseFloat(temp.paid.replace("$",""));
        return {
            name: months[i],
            spent: i === 1 ? 124760 / 3: i === 2 ? 124760 / 3: i === 3 ? 124760 / 3: i = 0  ,
            raised: i === 1 ? 250000: i === 2 ? 300000: i === 3 ? 200000: i = 0  ,
          };
      })

    }

    if(id === "5c6ac13643a755002212705f"){
      temp.project_completion = +(4/11 * 100).toFixed(2); 
      temp.project_increase_rate = 1.76;
      temp.percentage_task_completed = 75;
      temp.total_tasks = 11;
      temp.budget_exhausted = +(100 - (((350000 - 150000)/350000) * 100)).toFixed(2);
      temp.budget_exhaustion_rate = 0;
      temp.paid = 150000;
      temp.spending_rate =0;
      temp.spent = 0;
      temp.tasks_completed = 4;
      temp.tasks_completion_rate = 37;
      temp.spentVsRaised = Array.from({ length: 2 }).map((x,i)=>{
        // let formatted = parseFloat(temp.paid.replace("$",""));
        return {
            name: months[i],
            spent: i === 1 ? 150000:  i = 0,
            raised: i > 1 ?  0: 350000/2,
          };
      })

    }

    return (
      <AStyle className="xs-12">
        <div className="xs-12" id="top">
          <div className="xs-12 sm-12">
            <div className="f-l c-sm-screen">
              <h3>Project Health Overview</h3>
            </div>
            <div className="f-r c-sm-screen">
              <select
                className="date"
                name="date"
                value={date}
                onChange={this.handleDateUpdate}
              >
                <option value="30">Last 30 days </option>
                <option value="60">Last 60 days </option>
                <option value="90">Last 90 days </option>
                <option value="120">Last 120 days </option>
                <option value="150">Last 150 days </option>
                <option value="250">Last 250 days </option>
                <option value="365">Last 365 days </option>
              </select>
            </div>
          </div>
        </div>

        <div className="xs-12" id="cards">
          <div className="xs-12 sm-6 md-3">
            <div className="xs-12 sm-11">
              <div className="xs-12 a-info-card">
                <div className="xs-12">
                  <h3>Progress</h3>
                </div>
                <div className="xs-12 space">
                  <div className="f-l">
                    <h2>{temp.project_completion}%</h2>
                  </div>
                  <div className="f-r">
                    <span>+{temp.project_increase_rate}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={temp.project_completion}
                    strokeWidth="2"
                    trailWidth="2"
                    strokeColor="#0A2C56"
                    trailColor="#EAECEE"
                  />

                  <p>Project Completion</p>
                </div>
              </div>
            </div>
          </div>
          <div className="xs-12 sm-6 md-3">
            <div className="xs-12 sm-11">
              <div className="xs-12 a-info-card">
                <div className="xs-12">
                  <h3>Tasks completed</h3>
                </div>
                <div className="xs-12 space">
                  <div className="f-l">
                    <h2>{ temp.tasks_completed} / {temp.total_tasks}</h2>
                  </div>
                  <div className="f-r">
                    <span>+{temp.tasks_completion_rate}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={temp.percentage_task_completed}
                    strokeWidth="2"
                    trailWidth="2"
                    strokeColor="#0A2C56"
                    trailColor="#EAECEE"
                  />

                  <p>Task Completion</p>

                </div>
              </div>
            </div>
          </div>

          <div className="xs-12 sm-6 md-3">
            <div className="xs-12 sm-11">
              <div className="xs-12 a-info-card">
                <div className="xs-12">
                  <h3>Budget exhausted</h3>
                </div>
                <div className="xs-12 space">
                  <div className="f-l">
                    <h2>{temp.budget_exhausted}%</h2>
                  </div>
                  <div className="f-r">
                    <span>+{temp.budget_exhaustion_rate}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={temp.budget_exhausted}
                    strokeWidth="2"
                    trailWidth="2"
                    strokeColor="#0A2C56"
                    trailColor="#EAECEE"
                  />
                  <p>Total Budget </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xs-12 sm-6 md-3">
            <div className="xs-12 sm-11">
              <div className="xs-12 a-info-card">
                
              <div className='xs-12'>
                  <h3>Funding Goal</h3>
                  <h2>${this.props.goal}</h2>

                </div>
                
                <div className='xs-12'>
                  <h3>Funds Raised</h3>
                  <h2>${this.props.raised}</h2>

                </div>
                
                {/* <div className="xs-12 space">
                  <div className="f-l">
                    <h2>{temp.spent}</h2>
                  </div>
                  <div className="f-r">
                    <span>+{temp.spending_rate}%</span>
                  </div>
                </div>
                 */}
            
              </div>
            </div>
          </div>
        </div>

        <div className="xs-12" id="bottom-info">
          <div className="xs-12 md-6">
            <div className="xs-12 md-11">
              <div className="xs-12 white">
                <div className="xs-12 text-info">
                  <div className="f-l">
                    <h5>Monthly Spend by Category</h5>
                    <p>FEB, 2018</p>
                  </div>
                  {/* <div className="f-r">
                    <Link to={`/dashboard/project/${this.props.id}/transactions`}> See All Transactions </Link>
                  </div> */}
                </div>

                <div className="xs-12" id="chart-info">
                  <div className="xs-12 sm-6">
                    <div className="xs-12 has-bar">
                      <h1>{temp.paid}</h1>
                      <p>paid out this month</p>
                    </div>

                    <div className="xs-12 colors">
                      <div className="xs-12">
                        <span id="yellow" /> <p>EVALUATION TEAM</p>
                      </div>
                      <div className="xs-12">
                        <span id="blue" /> <p>CONTRACTOR PAYOUT</p>
                      </div>
                      <div className="xs-12">
                        <span id="green" /> <p>SUPPLIES</p>
                      </div>
                    </div>
                  </div>

                  <div className="xs-12 sm-6 corner">
                    <PieChartComp pie={pie} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xs-12 md-6">
            <div className="xs-12 white" id="bar-chart">
              <div className="xs-12">
                <div className="f-l">
                <h5>Financial Analysis For <strong>{moment().format("YYYY")}</strong> </h5>
                  {/* <span id="blue" />
                  <h5>Spend</h5>
                  <span>vs.</span>
                  <span id="grey" />
                  <h5>Raised</h5> */}
                </div>
              </div>

              <BarChartComp data={temp.spentVsRaised} />
            </div>
          </div>
        </div>
      </AStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.projects.single.info.tasks,
    goal: state.projects.single.info.goal,
    raised: state.projects.single.info.raised
    };
};

export default withRouter(connect(mapStateToProps)(Analytics));
