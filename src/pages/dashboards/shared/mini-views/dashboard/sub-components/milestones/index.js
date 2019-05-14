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

  .container{
    .row{
      background: white;
      .top{
        padding: 1em;
        border: 1px solid #E7EDF3;
        h3,p{
          margin: 0;
        }
      }
    }
    .heading{
      font-size: 1em;
      font-weight: 400; 
    }
    .heading-text{
      img{
        margin-right: 1em;
        float:left;
      }
      span{
        float:left;
        margin-top: 1em;
      }
      strong{

      }
    }
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
          <div className='xs-12 row'>
            <div className='top xs-12'>
              <div className='xs-12 sm-6 t-l'>
                <h3 className='heading'>Milestone title goes here</h3>
              </div>
              <div className='xs-12 sm-6 t-r'>
                <p className='heading-text'><img src={almost} alt=""/><span><strong>2</strong> of 3 tasks completed</span> </p>
              </div>
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