import React from "react";
import { Link } from "react-router-dom";
import { EmptyCardStyling } from "./card.style";
// import Progressbar from "../../unique/progressbar";

import { connect } from "react-redux";

const EmptyCard = ({ showMap }) => {
  return (
    <EmptyCardStyling
      className={
        showMap === true
          ? "xs-12 sm-6 lg-4 card-wrapper"
          : "xs-12 sm-6 lg-4  card-wrapper"
      }
    >
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

          {/* <Progressbar percentage={10} /> */}
        </div>
      </Link>
    </EmptyCardStyling>
  );
};

const mapStateToProps = state => {
  return {
    showMap: state.home.map.show
  };
};

export default connect(mapStateToProps)(EmptyCard);
