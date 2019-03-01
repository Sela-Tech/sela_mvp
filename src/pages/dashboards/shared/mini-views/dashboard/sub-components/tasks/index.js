import React from "react";
import connect from "react-redux/lib/connect/connect";
import TaskStyle from "./tasks.style";
import moment from "moment";
import {
  showModal
} from "../../../../../../../store/action-creators/modal";
import search from "../documents/search.svg";
import { SHOW_ADD_TASK_MODAL, SHOW_TASK_MODAL } from "../../../../../../../store/actions/modal";

class Tasks extends React.Component {
  state = {
    date: "",
    tasks: this.props.tasks
  };

  showAddTask = () => this.props.dispatch(showModal(
      SHOW_ADD_TASK_MODAL,
      { projectId: this.props.projectId }
    ));

  showTask = taskId => this.props.dispatch(showModal(
    SHOW_TASK_MODAL,
    { taskId }
  ));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        tasks: nextProps.tasks
      });
    }
  }

  render() {
    const { tasks } = this.state;

    return (
      <TaskStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Tasks</h3>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn" onClick={this.showAddTask}>
              Add Task
            </button>
          </div>
        </div>

        <div className="xs-12 sp">
          <div className="f-l xs-12 ">
            <div className="xs-12 md-6">
              <div className="xs-12 sm-11">
                <label>Search For Task</label>

                <form>
                  <div className="xs-12" id="search">
                    <input name="search" placeholder="Search For Tasks" />
                    <button>
                      <img src={search} alt="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="xs-12 sm-6">
              <div className="xs-12 sm-11">
                <label>Filter By</label>

                <select className="xs-12">
                  <option value="">No Filter</option>
                  <option>Funder</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
           
            <div className="xs-12 sm-6">
              <h4> Task Details</h4>
            </div>

            <div className="xs-12 sm-3">
              <h4> Deadline </h4>
            </div>

            <div className="xs-12 sm-3">
              <h4> </h4>
            </div>
          </div>
          {tasks && Boolean(tasks.length <= 0) ? (
            <div className="xs-12 ">
              <p>No Tasks Found</p>
            </div>
          ) : (
           tasks &&  tasks.map((t, i) => {
              return (
                <div className="xs-12 row b" key={i}>
                 
                  <div className="xs-12 sm-6">
                    <h3>{t.name}</h3>
                    <p className='xs-12 sm-11'>{t.description}</p>
                  </div>

                  <div className="xs-12 sm-3">
                    <h3> {moment(t.dueDate).format("DD MMM YYYY")} </h3>
                  </div>

                  <div className="xs-12 sm-3">
                    <button
                      className="more"
                      onClick={() => this.showTask(t._id)}
                    >
                      More
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </TaskStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    tasks: state.projects.single.info.tasks,
    type: state.tasks.add.action.type
  };
};

export default connect(mapStateToProps)(Tasks);
