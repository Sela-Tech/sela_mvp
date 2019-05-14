import React, { Component } from "react";
import {connect} from 'react-redux';
import styled from 'styled-components';
import almost from "../../../../../../../assets/milestone/almost.svg";
import half from "../../../../../../../assets/milestone/half.svg";
import empty from "../../../../../../../assets/milestone/empty.svg";

const MilestoneWrapper = styled.div`
  .create-mil{
    border: 1px solid rgba(14, 77, 227, 0.7);
    box-sizing: border-box;
    border-radius: 5px;
    font-family: Acumin Pro;
    font-size: 14px;
    line-height: 20px;
    color: #0E4DE3;
    padding: 0.75em 1.5em;
    font-weight: 300;
  }

  .text{
    font-size: 1em;
    font-weight: 300;
    margin: 2em 0;
  }
`;

class Milestones extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return <MilestoneWrapper className='xs-12'>
      <div className='xs-12'>
        <button className='create-mil'>+ Create Milestone</button>
      </div>

      {/* <div className='xs-12'>
        <p className='text'>No milestones have been created for this project.</p>
      </div> */}

      <div className='xs-12'>
        <div className='xs-12 container'>
          <div className='xs-12'>
            <div className='xs-12 sm-6 t-l'>
              <h3>Milestone title goes here</h3>
            </div>
            <div className='xs-12 sm-6 t-r'>
              <p><img src={almost} alt=""/><span><strong>2</strong> of 3 tasks completed</span> </p>
            </div>
            
          </div>
        </div>
      </div>

    </MilestoneWrapper>;
  }
}
const mapStateToProps =state=>{
  return {

  }
}

const mapDispatchToProps=dispatch=>{
  return {

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Milestones);