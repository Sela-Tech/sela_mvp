import React from "react";
import { ProjectWrapper } from "../../../styles/dashboard/project";
import { Line } from "rc-progress";
import Tasks from "./tasks.js";
import SidebarPhotos from "./sidebar-photos";

class ProjectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProjectWrapper className="xs-10 xs-off-1">
        <div id="top" className="xs-12">
          <h3>Project Title</h3>

          <div id="in-progress" className="xs-12">
            <div className="xs-12 md-10 pd">
              <div className="xs-4 md-2">
                <span className="m">Feb 12, 2018</span>
              </div>

              <div className="xs-12 md-8">
                <Line
                  percent={50}
                  strokeWidth="3"
                  trailWidth="3"
                  strokeColor="#156EDC"
                  trailColor="#F2F2F2"
                />
              </div>

              <div className="xs-4 md-2" style={{ float: "right" }}>
                <span className="m">Aug 30, 2018</span>
              </div>
            </div>
            <div className="xs-12 md-2 m">
              <button id="status"> In Progress</button>
            </div>
          </div>
        </div>

        <div id="bottom" className="xs-12">
          <Tasks className={"xs-12 md-8"} />
          <SidebarPhotos className={"xs-12 md-4"} />
        </div>
      </ProjectWrapper>
    );
  }
}

export default ProjectComponent;
