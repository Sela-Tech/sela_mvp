import React from "react";
import AStyle from "./a.styles";
import moment from "moment";
import { Link } from "react-router-dom";
import BarChartComp from "./bar";
import PieChartComp from "./pie";

import { Line } from "rc-progress";
import { BarChart, Bar } from "recharts";
import { connect } from "react-redux";

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      date: "",
      taskData: [],
      data: [
        { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
      ],
      pie: [
        { name: "Group A", value: 1 },
        { name: "Group B", value: 1 },
        // { name: "Group C", value: 1 },
        { name: "Group D", value: 1 }
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
    const { date, taskData, pie } = this.state;

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
                    <h2>0%</h2>
                  </div>
                  <div className="f-r">
                    <span>+0%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={1}
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
                    <h2>{this.props.tasks ? this.props.tasks.length : 0}</h2>
                  </div>
                  <div className="f-r">
                    <span>+0%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <BarChart width={150} height={40} data={taskData}>
                    <Bar dataKey="uv" fill="#0A2C56" />
                  </BarChart>
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
                    <h2>0%</h2>
                  </div>
                  <div className="f-r">
                    <span>+0%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={1}
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
                <div className="xs-12">
                  <h3>Spend</h3>
                </div>
                <div className="xs-12 space">
                  <div className="f-l">
                    <h2>$0</h2>
                  </div>
                  <div className="f-r">
                    <span>+0%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <BarChart width={150} height={40} data={taskData}>
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                </div>
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
                    <p>SEPTEMBER, 2018</p>
                  </div>
                  <div className="f-r">
                    <Link to="/transactions"> See All Transactions </Link>
                  </div>
                </div>

                <div className="xs-12" id="chart-info">
                  <div className="xs-12 sm-6">
                    <div className="xs-12 has-bar">
                      <h1>$0</h1>
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
                    <PieChartComp pie={pie} data={taskData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xs-12 md-6">
            <div className="xs-12 white" id="bar-chart">
              <div className="xs-12">
                <div className="f-l">
                  <span id="blue" />
                  <h5>Spend</h5>
                  <span>vs.</span>
                  <span id="grey" />
                  <h5>Raised</h5>
                </div>
              </div>

              <BarChartComp data={taskData} />
            </div>
          </div>
        </div>
      </AStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.projects.single.info.tasks
  };
};

export default connect(mapStateToProps)(Analytics);
