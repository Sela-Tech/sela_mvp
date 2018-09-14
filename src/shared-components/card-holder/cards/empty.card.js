import React from "react";
import { Link } from "react-router-dom";
import { EmptyCardStyling } from "./card.style";
import Progressbar from "../../unique/progressbar";

const EmptyCard = () => {
  return (
    <EmptyCardStyling className="xs-12 sm-4 card-wrapper">
      <Link to={`#`}>
        <div className="xs-12 sm-11 card">
          <img
            src="http://placehold.it/200"
            alt=""
            className="project-picture"
          />

          <div className="inner">
            <span className="loading-title" />
            <span className="loading-funder" />
          </div>

          <Progressbar percentage={10} />
        </div>
      </Link>
    </EmptyCardStyling>
  );
};

export default EmptyCard;
