import React, { /*Fragment*/ } from "react";
import AStyle from "./a.styles";
import moment from "moment";
import {Line} from "rc-progress";
import  {BarChart} from "recharts";
import {Bar} from "recharts";
import connect from "react-redux/lib/connect/connect";

import { withRouter } from "react-router";

class Analytics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      date: "",
      taskData: [],
      pie: [],
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
       
      });
    }
  }

  handleDateUpdate = e => this.setState({ date: e.target.value });

  render() {
    return (

      <AStyle className="xs-12">
        
      <div className="xs-12" id="top">
        <div className="xs-12">
          <div className="f-l c-sm-screen">
            <h3>Project Health Overview</h3>
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
                    <h2>{0}%</h2>
                  </div>
                  <div className="f-r">
                    <span>+{0}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={0}
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
                    <h2>{ 0 } </h2>
                  </div>
                  <div className="f-r">
                    <span>+{0}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={0}
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
                    <h2>{0}%</h2>
                  </div>
                  <div className="f-r">
                    <span>+{0}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <Line
                    percent={0}
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
                  <h3>Spending Total</h3>
                </div>
                <div className="xs-12 space">
                  <div className="f-l">
                    <h2>{0}</h2>
                  </div>
                  <div className="f-r">
                    <span>+{0}%</span>
                  </div>
                </div>
                <div className="progress xs-12">
                  <BarChart width={150} height={40} data={0}>
                    <Bar dataKey="uv" fill="#8884d8" />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
        </div>

       }
  
      </AStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.projects.single.info.tasks
  };
};

export default withRouter(connect(mapStateToProps)(Analytics));
