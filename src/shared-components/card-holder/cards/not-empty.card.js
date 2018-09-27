import React from "react";
// import { Link } from "react-router-dom";
import { NotEmptyCardStyling2 } from "./card.style";
// import Progressbar from "../../unique/progressbar";

import { Line } from "rc-progress";
import { withRouter } from "react-router";

const NotEmptyCard = ({ p, history }) => {
  return (
    <NotEmptyCardStyling2 className="xs-12 sm-6">
      <div className="container xs-12">
        <div className="box xs-12 md-11 sm-11">
          <img
            src={p.picture}
            alt={""}
            onClick={() => history.push(`/projects/${p._id}/description`)}
          />
          <div className="inner">
            <div className="text">
              <h3>{p.name}</h3>
              <p> {p.owner.organization.name} </p>
            </div>

            <div className="tasks xs-12">
              <Line
                percent={p.percentage}
                strokeWidth="4"
                trailWidth="4"
                strokeColor="#156EDC"
                trailColor="#F2F2F2"
              />
              <div className="xs-12 dw">
                <p className="xs-9">{p.percentage} Funded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NotEmptyCardStyling2>

    // <NotEmptyCardStyling className="xs-12 sm-6 card-wrapper">
    //   <Link to={`/projects/${p._id}`}>
    //     <div className="xs-12 sm-11 card">
    //       <img src={p.picture} alt="" className="project-picture" />

    //       <div className="inner">
    //         <h4>{p.name}</h4>
    //         <h5>{p.owner.organization.name}</h5>
    //         <Progressbar percentage={p.percentage} displayText={true} />
    //       </div>
    //     </div>
    //   </Link>
    // </NotEmptyCardStyling>
  );
};

export default withRouter(NotEmptyCard);
