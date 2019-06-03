import React, { Fragment } from "react";
import AStyle from "./a.styles";
import moment from "moment";
// import {Line} from "rc-progress";
// import  {BarChart} from "recharts";
// import {Bar} from "recharts";

import connect from "react-redux/lib/connect/connect";
import { ResponsiveLine } from '@nivo/line'
import ReactTooltip from "react-tooltip";
import { withRouter } from "react-router";

import help from "../../../../../../../assets/icons/help.svg";
// import { ShowDisclaimer } from "../../../../../../../startupMode.config";

const data_for_line_graph = [
  { "name": "TPH Calibration Curve",
    "yAxisName": "Absorbance @ 420nm",
    "xAxisName": "Concentration (mg/l)",
    "id": "Spectrophotometer Data",
    "color": "hsl(17, 70%, 50%)",
    "data": [
      {
        "x": "0.00",
        "y": 0.00
      },
      {
        "x": "0.50",
        "y": 0.046
      },
      {
        "x": "1.00",
        "y": 0.054
      },
      {
        "x": "1.50",
        "y": 0.103
      },
      {
        "x": "2.00",
        "y": 0.155
      },
      {
        "x": "2.50",
        "y": 0.165
      },
      {
        "x": "3.00",
        "y": 0.208
      },
      {
        "x": "3.50",
        "y": 0.246
      }
    ]
  }
]

const data_right = [
    { "name": " Total Petroleum Hydrocarbon Content Of Soil",
    "yAxisName": "TPH",
    "xAxisName": "Time",
    "id": "Right Front Center",
    "color": "hsl(17, 70%, 50%)",
    "data": [
      {
        "x": "4/17/2018",
        "y": 16.73
      },
      {
        "x": `4/18/2018`,
        "y": 15.28
      },
      {
        "x": "4/25/2018",
        "y": 12.62
      },
      {
        "x": "5/2/2018",
        "y": 11.67
      },
      {
        "x": "5/9/2018",
        "y": 10.92
      }]
    },
      {id: "Right Front Middle",
      color: 'hsl(238, 70%, 50%)',
      data: [
        {
          "x": "4/17/2018",
          "y": 16.85
        },
        {
          "x": `4/18/2018`,
          "y": 14.16
        },
        {
          "x": "4/25/2018",
          "y": 13.66
        },
        {
          "x": "5/2/2018",
          "y": 13.05
        },
        {
          "x": "5/9/2018",
          "y": 12.44
        }
      ]},
      {id: "Right Middle Section",
      "color": "hsl(240, 70%, 50%)",
      data: [
        {
          "x": "4/17/2018",
          "y": 14.04
        },
        {
          "x": `4/18/2018`,
          "y": 13.12
        },
        {
          "x": "4/25/2018",
          "y": 9.92
        },
        {
          "x": "5/2/2018",
          "y": 9.22
        },
        {
          "x": "5/9/2018",
          "y": 7.53
        }
      ]},
      {id: "Right Back Corner",
      "color": "hsl(110, 70%, 50%)",
      data: [
        {
          "x": "4/17/2018",
          "y": 16.16
        },
        {
          "x": `4/18/2018`,
          "y": 15.28
        },
        {
          "x": "4/25/2018",
          "y": 14.9
        },
        {
          "x": "5/2/2018",
          "y": 13.34
        },
        {
          "x": "5/9/2018",
          "y": 11.28
        }
      ]}
    ]

const data_left = [
  {"name": " Total Petroleum Hydrocarbon Content Of Soil",
  "yAxisName": "TPH",
  "xAxisName": "Time",
  "id": "Left Back Middle",
    "color": "hsl(288, 70%, 50%)",
    data: [
      {
        "x": "4/17/2018",
        "y": 15.37
      },
      {
        "x": `4/18/2018`,
        "y": 14.77
      },
      {
        "x": "4/25/2018",
        "y": 14.04
      },
      {
        "x": "5/2/2018",
        "y": 12.23
      },
      {
        "x": "5/9/2018",
        "y": 7.71
      }
    ]},
    {id: "Left Back Corner",
    "color": "hsl(188, 30%, 90%)",
    data: [
      {
        "x": "4/17/2018",
        "y": 15.41
      },
      {
        "x": `4/18/2018`,
        "y": 14.77
      },
      {
        "x": "4/25/2018",
        "y": 13.69
      },
      {
        "x": "5/2/2018",
        "y": 13.04
      },
      {
        "x": "5/9/2018",
        "y": 11.67
      }
    ]},
    {id: "Left Middle Section",
    "color": "hsl(80, 69%, 69%)",
    data: [
      {
        "x": "4/17/2018",
        "y": 11.89
      },
      {
        "x": `4/18/2018`,
        "y": 11.56
      },
      {
        "x": "4/25/2018",
        "y": 11.33
      },
      {
        "x": "5/2/2018",
        "y": 10.60
      },
      {
        "x": "5/9/2018",
        "y": 9.22
      }
    ]},
    {id: "Left Front Center",
    "color": "hsl(128, 14%, 31%)",
    data: [
      {
        "x": "4/17/2018",
        "y": 16.09
      },
      {
        "x": `4/18/2018`,
        "y": 13.92
      },
      {
        "x": "4/25/2018",
        "y": 12.14
      },
      {
        "x": "5/2/2018",
        "y": 11.24
      },
      {
        "x": "5/9/2018",
        "y": 8.70
      }
    ]}
]



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
        // taskData: nextProps.tasks.map(t => {
        //   return {
        //     name: t.name,
        //     uv: 0,
        //     pv: 0,
        //     amt: 0
        //   };
        // })
      });
    }
  }

  handleDateUpdate = e => this.setState({ date: e.target.value });


  render() {
    return (

      <AStyle className="xs-12">
        
      {/* <div className="xs-12" id="top"> */}
{/* 
        <div className="xs-12">
          <div className="f-l c-sm-screen">
            <h3>Project Health Overview</h3>
          </div>
        </div> */}

      {/* </div> */}

      {/* <div className="xs-12" id="cards">
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

      <div className="xs-12" id="top">
        <div className="xs-12">
          <div className="f-l c-sm-screen">
            <h3>Visualizations</h3>
          </div>
        </div>
      </div> */}

      <section className='xs-12 graphs'>
        { 
        <Fragment>

        <div className='xs-12 graph-container'>
            <p>
                <span>{data_for_line_graph[0].name}</span>
                <span><img src={help} data-tip data-for={'TPH Calibration Curve'} alt='' className='help'/></span>
            </p>
            <div className='xs-12 one'>
              <ResponsiveLine
                  data={data_for_line_graph}
                  margin={{
                      "top": 50,
                      "right": 200,
                      "bottom": 50,
                      "left": 60
                  }}
                  xScale={{
                      "type": "linear"
                  }}
                  yScale={{
                      "type": "linear",
                      "stacked": true,
                      "min": "auto",
                      "max": "auto"
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                      "orient": "bottom",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": data_for_line_graph[0].xAxisName,
                      "legendOffset": 36,
                      "legendPosition": "middle"
                  }}
                  axisLeft={{
                      "orient": "left",
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": data_for_line_graph[0].yAxisName,
                      "legendOffset": -40,
                      "legendPosition": "middle"
                  }}
                  dotSize={10}
                  dotColor="inherit:darker(0.3)"
                  dotBorderWidth={2}
                  dotBorderColor="#ffffff"
                  enableDotLabel={true}
                  dotLabel="y"
                  dotLabelYOffset={-12}
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                  legends={[
                      {
                          "anchor": "bottom-right",
                          "direction": "column",
                          "justify": false,
                          "translateX": 100,
                          "translateY": 0,
                          "itemsSpacing": 0,
                          "itemDirection": "left-to-right",
                          "itemWidth": 80,
                          "itemHeight": 20,
                          "itemOpacity": 0.75,
                          "symbolSize": 12,
                          "symbolShape": "circle",
                          "symbolBorderColor": "rgba(0, 0, 0, .5)",
                          "effects": [
                              {
                                  "on": "hover",
                                  "style": {
                                      "itemBackground": "rgba(0, 0, 0, .03)",
                                      "itemOpacity": 1
                                  }
                              }
                          ]
                      }
                  ]}
              />
            </div>
        </div>
        
        <div className='xs-12 graph-container'>
            <p>
              <span>{data_right[0].name}</span>
              <span><img src={help} data-tip data-for={'Total Petroleum Hydrocarbon Content Of Soil'} alt='' className='help'/></span>
            </p>
          
          <div className='xs-12 one'>
            <ResponsiveLine
                data={data_right}
                margin={{
                    "top": 50,
                    "right": 200,
                    "bottom": 50,
                    "left": 60
                }}
                xScale={{
                    "type": "point"
                }}
                yScale={{
                    "type": "linear",
                    "stacked": true,
                    "min": "auto",
                    "max": "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": data_right[0].xAxisName,
                    "legendOffset": 36,
                    "legendPosition": "middle"
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": data_right[0].yAxisName,
                    "legendOffset": -40,
                    "legendPosition": "middle"
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom-right",
                        "direction": "column",
                        "justify": false,
                        "translateX": 100,
                        "translateY": 0,
                        "itemsSpacing": 0,
                        "itemDirection": "left-to-right",
                        "itemWidth": 80,
                        "itemHeight": 20,
                        "itemOpacity": 0.75,
                        "symbolSize": 12,
                        "symbolShape": "circle",
                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                    "itemOpacity": 1
                                }
                            }
                        ]
                    }
                ]}
            />
          </div>

          <div className='xs-12 two'>
            <ResponsiveLine
                data={data_left}
                margin={{
                    "top": 50,
                    "right": 200,
                    "bottom": 50,
                    "left": 60
                }}
                xScale={{
                    "type": "point"
                }}
                yScale={{
                    "type": "linear",
                    "stacked": true,
                    "min": "auto",
                    "max": "auto"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": data_left[0].xAxisName,
                    "legendOffset": 36,
                    "legendPosition": "middle"
                }}
                axisLeft={{
                    "orient": "left",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": data_left[0].yAxisName,
                    "legendOffset": -40,
                    "legendPosition": "middle"
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        "anchor": "bottom-right",
                        "direction": "column",
                        "justify": false,
                        "translateX": 100,
                        "translateY": 0,
                        "itemsSpacing": 0,
                        "itemDirection": "left-to-right",
                        "itemWidth": 80,
                        "itemHeight": 20,
                        "itemOpacity": 0.75,
                        "symbolSize": 12,
                        "symbolShape": "circle",
                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                        "effects": [
                            {
                                "on": "hover",
                                "style": {
                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                    "itemOpacity": 1
                                }
                            }
                        ]
                    }
                ]}
            />
          </div>
        
        </div>
        
             <div className='xs-12'>
                      
              <ReactTooltip place="bottom" type="info" effect="solid" id='TPH Calibration Curve'>
                <span style={{color: "white"}}>Experimental method used to determine TPH level from different soil samples</span>
              </ReactTooltip>

              <ReactTooltip place="bottom" type="info" effect="solid" id='Total Petroleum Hydrocarbon Content Of Soil'>
                <span  style={{color: "white"}}>
                Total petroleum hydrocarbons (TPH) is a term used to describe a large family of several hundred chemical compounds that originally come from crude oil.
                </span>
              </ReactTooltip>
            
            </div>
        </Fragment>
        }
        </section>
  
      </AStyle>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.projects.single.info.tasks
  };
};

export default withRouter(connect(mapStateToProps)(Analytics));
