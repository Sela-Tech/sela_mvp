import React from 'react';

import { Line } from "rc-progress";

export default class ProjectTemplate extends React.Component {
  state = {
    hidden: true
  };

  toggle = () => {
    this.setState(p => {
      return {
        hidden: !p.hidden
      };
    });
  };

  render() {
    const {
        t,
        o,
        p,
        go,
        triggerDeleteModal,
        triggerToggleModal,
        activated,
        goal,
        raised,
        tasks
      } = this.props,
      { hidden } = this.state;

    const hasImage = p;

    return (
      <div className="container xs-12 sm-6 md-4">
        <div className="box xs-12 md-11 sm-11">
          {Boolean(hasImage) ? (
            <img src={p} onClick={go} alt="" />
          ) : (
            <div className="no-image" onClick={go}>
              <div className="c-w i-h">
                <div className="c i-h">
                  <h1>{t}</h1>
                </div>
              </div>
            </div>
          )}
          <div className="inner">
            <div className="text">
              <h3 onClick={go}>{t}</h3>
              <p> {o} </p>
            </div>

            <div className="tasks xs-12">
              <Line
                percent={(raised / goal) * 100}
                strokeWidth="4"
                trailWidth="4"
                strokeColor="#156EDC"
                trailColor="#F2F2F2"
              />
              <div className="xs-12 dw">
                <p className="xs-9">{tasks.length} Tasks</p>

                <div className="xs-3">
                  <button
                    className="ellipsis"
                    onClick={this.toggle}
                    type="button"
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!hidden && (
          <div className="options xs-6"  onMouseLeave ={()=>this.setState({hidden: true})}
          >
            <ul>
              <li onClick={go}> View</li>

              <li
                className={activated ? "de" : "re"}
                onClick={() => {
                  triggerToggleModal();
                  this.toggle();
                }}
              >
                {activated ? "Hide From Public" : "Show Public"}
              </li>

              <li
                className="delete"
                onClick={() => {
                  triggerDeleteModal();
                  this.toggle();
                }}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
