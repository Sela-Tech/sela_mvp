import React from "react";
import { ProjectWrapper } from "../../../../styles/dashboards/project-funder/project";
import { Line } from "rc-progress";
import Tasks from "./tasks.js";
// import SidebarPhotos from "./sidebar-photos";
import moment from "moment";
import TransactionHistory from "./transaction-history";

const ProjectComponent = ({ info }) => {
  const {
    title,
    end_date,
    start_date,
    percentage,
    status,
    tasks,
    id,
    // photos,
    transactions
  } = info;

  return (
    <ProjectWrapper className="xs-10 xs-off-1">
      <div id="top" className="xs-12">
        <h3>{title}</h3>

        <div id="in-progress" className="xs-12">
          <div className="xs-12 md-10 pd">
            <div className="xs-4 md-2">
              <span className="m">
                {moment(start_date).format("MMM D, YYYY")}
              </span>
            </div>

            <div className="xs-12 md-8">
              <Line
                percent={percentage}
                strokeWidth="3"
                trailWidth="3"
                strokeColor="#156EDC"
                trailColor="#F2F2F2"
              />
            </div>

            <div className="xs-4 md-2" style={{ float: "right" }}>
              <span className="m">
                {moment(end_date).format("MMM D, YYYY")}
              </span>
            </div>
          </div>
          <div className="xs-12 md-2 m">
            <button id="status"> {status}</button>
          </div>
        </div>
      </div>

      <div id="bottom" className="xs-12">
        <Tasks className={"xs-12 md-7"} tasks={tasks} />
        {/* <SidebarPhotos className={"xs-12 md-4"} photos={photos} /> */}
        <TransactionHistory
          className={"xs-12 md-5"}
          transactions={transactions}
          showDefaultTitle={true}
          link={"/project/" + id + "/transactions"}
        />
      </div>
    </ProjectWrapper>
  );
};

export default ProjectComponent;
