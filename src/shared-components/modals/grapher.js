import React, {Component} from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment';
import { isNumber } from 'util';

const GraphWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 100vh;
width: 100vw;
background: rgba(0,0,0,0.8);
z-index: 11;

.match{
    background: white;
    padding: 1em 0em 3em 1em;
    border-radius: 4px;
    height: auto;
    float: left;
}

.close{
    background: orangered;
    color: white;
    font-size: 1em;
    font-weight: 300;
    border: 0;
    margin: 1em;
    padding: 0;
    border-radius: 3px;
    line-height: 1;
    height: 1.85em;
    width: 4em;
    text-align: center;
    line-height: 2em;
}
`;

const SimpleLineGraph = ({ data, config })=>{

    data = data.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    }).map(datum=>{
        
        let date, 
        obj = {
            user: datum.user,
            "x": datum[config.columnX],
            "y": datum[config.columnY]
        };

        if(config.columnX === "Date"){
            date = moment(datum[config.columnX]).format("DD/MM/YY");
            obj.x  = date;
        }else if(config.columnY === "Date"){
            date = moment(datum[config.columnY]).format("DD/MM/YY");
            obj.y = date;
        } 

        if(config.columnX === "user"){ 
            obj.x  = datum[config.columnX].fullName;
        }else if(config.columnY === "user"){
            obj.y = datum[config.columnY].fullName;;
        }

        if( isNumber(datum[config.columnX])){
            obj.x = parseFloat(datum[config.columnX]);
        }

        if( isNumber(datum[config.columnY])){
            obj.y = parseFloat(datum[config.columnY]);
        }
        
        return obj;
    });

    let users = new Set([]);
    let usersSimplified = [];
    
    data.forEach(datum => {
       if(users.has(datum.user._id)  === false ){
            usersSimplified.push({
                _id: datum.user._id, name: datum.user.fullName
            });
            users.add(datum.user._id)
       }
    });

    users = [...users];

    let dataPerUser = usersSimplified.map(user => {
        return { 
            "id": user.name,
            "color": `hsl(${Math.round(Math.random() * 100)}, 
            ${Math.round(Math.random() * 100)}%,
            ${Math.round(Math.random() * 100)}%)`,
            "data": data.filter(datum => datum.user._id === user._id)
            .map(legendInfo => {
                return {
                    'x': legendInfo.x,
                    "y": legendInfo.y
                }
             })
           }
    });

    return <div className='xs-12' style={{height: 350, marginTop: '2em'}}>

      <p style={{
        padding: 0,
        margin: 0,
        fontSize: '0.9em',
        color: '#777',
        fontWeight: '300'
      }}>
        <span>Line Graph Plot Of <strong>{config.columnY}</strong> against <strong>{config.columnX}</strong></span>
      </p>

     <ResponsiveLine
        data={dataPerUser}
        margin={{
            "top": 50,
            "right": 150,
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
            "legend": config.columnX,
            "legendOffset": 36,
            "legendPosition": "middle"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend":config.columnX,
            "legendOffset": -55,
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
}

class Grapher extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            graphInformation: props.graphInformation
        }
    }

    render(){
        const {data, graphInformation} = this.state;
      
        switch (graphInformation.graphType) {
            case "line":
                return <SimpleLineGraph config={graphInformation.configuration} data = {data}/>
        
            default:
               return null;
        }

    }
}

export default ({...props}) => <GraphWrapper className='xs-12'>
    <div className='c-w i-h xs-12'>
        <div className='c t-c i-h '>
            <div className='match xs-10 xs-off-1'>
                <Grapher {...props} />
            </div>
            <div className='xs-12 t-c'>
                <button className='close' type='button' onClick={props.closeGraph}> Back </button>
            </div>
        </div>
    </div>
</GraphWrapper>;