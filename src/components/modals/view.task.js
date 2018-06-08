import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import dashboard from "../../store/actions/dashboard";

const ViewTaskWrapper = styled.div`
  > p {
    font-size: 1em;
    text-align: center;
    color: #828282;
    padding: 0 2em;
    font-weight: 100;
  }

  .left,.right{
    padding: 3em;
  }

  h2,p,h4{
    text-align: left;
    margin: 0;
}

  h2{
    line-height: normal;
    font-size: 1.35em;
    font-weight: 300;
    color: #333333;
    margin: 2em 0;
  }

  h4,p{
      font-weight: 300;
      font-size: 1em;
      margin: .2em 0;
  }

  p{
        line-height: normal;
        color: #4F4F4F;
  }

  h4{
    line-height: normal;
    color: #ADB5BD;
  }

  .grey-border{
      padding: 1em; 
    background: #FFFFFF;
    border: 3px solid #F1F3F5;
    border-radius: 17px;
    
      button{
          font-weight: 300;
          font-size: 1em;
          border:0;
        line-height: normal;
        padding: .75em;
color: #ADB5BD;
          &.active{
            background: #EFF5FB;
            border-radius: 9px;
            color: #156EDC;
          }
      }
  }

  .grey{
    background: #EFF5FB;   
    height: 100%; 
  }

`;

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  return {
    add_task_in_progress: type === dashboard.ADD_TASK_IN_PROGRESS,
    message,
    type
  };
};


export default connect(mapStateToProps)(
  class ViewTask extends React.Component {

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    render() {
    // const   { type, message } = this.state;
      return (
        <ViewTaskWrapper className="xs-12">
<div className="xs-12 md-6 left">
<h2>     Survey K-Dere for buried oil  </h2>
<div className="xs-4">
<h4>Task Created</h4>
<p>March 5, 2018</p>
</div>
<div className="xs-4">
<h4>Deadline</h4>
<p>June 15, 2018</p>
</div>
<div className="xs-4">
<h4>Contractor Assigned</h4>
<p>Sustainability international</p>
</div>

<div className="xs-12">
    <h4>Status</h4>
    <div className="grey-border xs-11">
        <button className="xs-4">Not Started</button>
        <button className="xs-4">In Progress</button>
        <button className="xs-4 active">Complete</button>
    </div>
</div>

<div className="xs-12"></div>


</div>
<div className="xs-12 md-6 right grey" ></div>

        </ViewTaskWrapper>
    );
    }
  }
);
