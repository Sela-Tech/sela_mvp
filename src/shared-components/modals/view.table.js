import {plain} from '../../pages/dashboards/shared/styling/table';
import React,{ Component, Fragment } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import styled from "styled-components";
import { SHOW_STAKEHOLDER_MODAL, SHOW_GRAPH_SELECTOR } from '../../store/actions/modal';
import { showModal } from '../../store/action-creators/modal';
import Grapher from "./grapher";

const TouchedUpWrap = styled.div`
    ${plain}
    .t-r{
        text-align: right;
    }
    .t-l{
        text-align: left;
    }
    
    .others{
        padding: 1em 3%;

        label, p{
            text-align: left;
        }
        label{
            color: #999;
        }
    }
    .content{
        overflow: scroll !important;

        .col-row + .col-row{
            border-left: 1px solid ##efefef;
        }
    }

    .avatar-text{
        float: left;
        text-align: center;
        width: 100%;
        padding-left: 15.33%;
        
        img{
            float: left;
            height: 2em;
            width: 2em;
            width: 2em;
            border-radius: 2em;
            display: inline-block;
            position: relative;
            object-fit: cover;
            text-align: center;
            display: inline-block;
            top: -0.4em;
            margin-right: 1em;
        }

        span{ 
            display: inline-block;
            font-size: 1em;
            float: left;
        }

    }


    button.create{
        background: #F2994A;
        border-radius: 5px;
        padding: 0.85em 1em;
        font-weight: 300;
        border: 0;
        color: white;
        font-size: 0.8em;
        font-weight: 300;
        line-height: 0;
        height: 30px;
    }
`;

const SelectGraphModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.8);
    z-index: 10;

    .selector{
        border-radius: 4px;
        padding: 1em 1.5em;
        border: 1px solid #eee;
        background: white;
    }

    button.create{
        background: #F2994A;
        border-radius: 5px;
        padding: 0.85em 1em;
        font-weight: 300;
        border: 0;
        color: white;
        font-size: 0.8em;
        font-weight: 300;
        line-height: 0;
        height: 30px;
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


class MiniExcelTable extends Component{
    constructor(props){
        super(props);
        this.state={
            subData: props.subData,
            fields: props.fields,
            showMiniView: false,
            showGraph: false,
            graphInformation: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({
                subData: nextProps.subData
            })
        }
    }

    showMiniView = () => this.setState({
        showMiniView: true
    });

    dissmissView = () => this.setState({
        showMiniView: false
    })

    showSH = id => this.props.dispatch(showModal(
        SHOW_STAKEHOLDER_MODAL,
        { stakeholder: id }
      ));
    
    showGraphSelector = data => this.props.dispatch(showModal(SHOW_GRAPH_SELECTOR, data ));

    setGraph = graphInformation => {
        if(graphInformation){
            this.setState({
                graphInformation,
                showGraph: true,
                showMiniView: false
            })
        }
    }

    closeGraph = ()=>{
        this.setState({
            showGraph: false, showMiniView: true
        })
    }

    static SelectGraphModal = class extends Component{
        constructor(props){
            super(props);
            this.state = {
                graph: "line",
                columnY: "",
                columnX: "",
                tableData: props.tableData
            }
        }

        handleGraphSelect = e => {
            const { value } = e.target;
            this.setState({
                graph: value
            })
        }

        handleColumnSelect = e => {
            const { value, name } = e.target;
            this.setState({
                [name]: value
            })
        }

        setGraph = () => {
            let graphData = {
                graphType: this.state.graph
            };

            if(this.state.graph === 'line'){
                graphData.configuration =  {
                    columnX: this.state.columnX,
                    columnY: this.state.columnY
                }
            }
            this.props.setGraph( graphData );
        }

        render(){
            return <SelectGraphModalWrapper 
            className='full c-w' onClick={this.props.dissmissView}>
                <div className='c i-h'>
                        <div className='xs-4 xs-off-4 selector'>
                            <div className='xs-12' onClick={e=> e.stopPropagation()}>
                                <div className='form-group xs-12'>
                                    <label>Type Of Graph</label>
                                    <select name='graph' value={this.state.graph} onChange={this.handleGraphSelect}>
                                        <option value='line'>Line Graph</option>
                                        {/* <option value='bar'>Bar Graph</option> */}
                                    </select>
                                </div>

                            {
                                this.state.graph === "line" &&  <div className='form-group xs-12'>
                                    <div className='form-group xs-12'>
                                        <label>Select column for <strong>Y Axis</strong> data</label>
                                        <select name='columnY' value={this.state.columnY} onChange={this.handleColumnSelect}>
                                        <option hidden>Select A Column Field</option>

                                        { this.props.fields.filter(field=>{
                                            return field.title !== this.state['columnX']  && field.responseType === 'Number'
                                        }).map((field,i)=>{
                                            return <option value={field.title} key={i}>{field.title}</option>
                                        }) }
                                        </select>
                                    </div>

                                    <div className='form-group xs-12'>
                                        <label>Select column for <strong>X Axis</strong> data</label>
                                        
                                        <select name='columnX' value={this.state.columX} onChange={this.handleColumnSelect}>
                                        <option hidden>Select A Column Field</option>
                                        { this.props.fields.filter(field=>{
                                            return field.title !== this.state['columnY'] 
                                        }).map((field,i)=>{
                                            return <option value={field.title} key={i}>{field.title}</option>
                                        }) }
                                        </select>
                                    </div>
                                </div>
                            }

                            <div className='xs-12 form-group'>
                                <button className='create' type='button' onClick={this.setGraph}> Plot </button>
                            </div>
                                
                            </div>
                    </div>
                    <div className='xs-12 t-c'>
                            <button className='close' type='button' onClick={this.props.dissmissView}> Close </button>
                        </div>
                </div>
            </SelectGraphModalWrapper>
        }
    }

    render(){

        let  real_fields = this.props.fields;
        const  fields = [{ title: "Stakeholder" }, ...real_fields];
 
        let width = 100 / fields.length;
        let { subData, showMiniView, showGraph, graphInformation } = this.state;

        let submissions = subData.submissions.map(sub => {
            let keys = Object.keys(sub).filter(key => key !== 'user');
            let temp = {  user: sub.user  };
            keys.forEach(key => { temp[key] = sub[key] });
            return temp;
        });

        let fake_sub = [
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "0",
                "Concentration (mg/l)": 0,
                Date: submissions[0].date
            },
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "0.5",
                "Concentration (mg/l)": 0.046,
                Date: submissions[0].date
            },
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "1",
                "Concentration (mg/l)": 0.054,
                Date: submissions.date
            },
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "1.5",
                "Concentration (mg/l)": 0.103,
                Date: submissions[0].date
            },
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "2",
                "Concentration (mg/l)": 0.155,
                Date: submissions[0].date
            },
            {
                user: submissions[0].user,
                "Absorbance @ 420nm": "2.5",
                "Concentration (mg/l)": 0.165,
                Date: submissions[0].date,
            },
            {
                user: submissions[0].user,

                "Absorbance @ 420nm": "3",
                "Concentration (mg/l)": 0.208,
                Date: submissions[0].date,
            },
            {
                user: submissions[0].user,

                "Absorbance @ 420nm": "3.5",
                "Concentration (mg/l)": 0.246,
                Date: submissions[0].date,
            }
           
    ]


        return <Fragment>

                    { 
                        showMiniView && 
                        showGraph === false &&
                        <MiniExcelTable.SelectGraphModal 
                            fields={fields}
                            dissmissView = {this.dissmissView} 
                            setGraph={this.setGraph} 
                        />
                    }

                    { 
                        showMiniView === false && 
                        showGraph === true && 
                        <Grapher data = {fake_sub} 
                        graphInformation = {graphInformation}
                        closeGraph={this.closeGraph}
                        />
                    }

                    <TouchedUpWrap className='xs-12'>
                    <div className='others xs-12'>

                        <div className='xs-6 t-l'>
                            <label>Due Date</label>
                            <p> {moment(this.props.dueDate).format("DD MMMM YYYY")}</p>
                        </div>

                        <div className='xs-6 t-r'>
                            <button className='create' type='button' onClick={this.showMiniView}>Graph Data</button>
                        </div>
                        
                    </div>
                    <div className='headings xs-12'>
                        {
                            fields.map((column,index)=>{
                                return <div style={{width: `${width}%`, float: 'left'}} key={index}>
                                    <h3>{column.title}</h3>
                                </div>
                            })
                        }
                    </div>

                    <div className='content xs-12'>
                        { fake_sub.map((sub,i)=>{
                            return <div className='xs-12 row' key={i}>
                                {Object.keys(sub).map(( column, index )=>{
                                    return <div className='col-row' style={{ width: `${width}%`, float: "left" }} key={index}> 
                                        {column  === 'user' ?
                                            <button onClick={()=>this.showSH(sub[column]._id)}><img src={sub[column].profilePhoto} alt=""/>{sub[column].fullName} </button>
                                        :
                                            <p>{ column.trim().toLowerCase() === 'date' ?
                                            moment(sub[column]).format("DD MMMM YYYY") : sub[column] }</p>
                                        }
                                    </div>
                                })}
                            </div>
                            })
                        }
                    </div>  
                </TouchedUpWrap>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        subData: state.modal.submissionData,
        dueDate: state.evidence.selectedTaskSubmissions.dueDate
    }
}

export default connect(mapStateToProps)(MiniExcelTable);