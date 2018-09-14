import React from "react";
import { Link } from "react-router-dom";
import { NotEmptyCardStyling } from "./card.style";
import Progressbar from "../../unique/progressbar";

const NotEmptyCard = ({ p }) => {
  return (
    <NotEmptyCardStyling className="xs-12 sm-4 card-wrapper">
      <Link to={`/projects/${p._id}`}>
        <div className="xs-12 sm-11 card">
          <img src={p.picture} alt="" className="project-picture" />

          <div className="inner">
            <h4>{p.name}</h4>
            <h5>{p.owner.organization.name}</h5>
            <Progressbar percentage={p.percentage} displayText={true} />
          </div>
        </div>
      </Link>
    </NotEmptyCardStyling>
  );
};

export default NotEmptyCard;
