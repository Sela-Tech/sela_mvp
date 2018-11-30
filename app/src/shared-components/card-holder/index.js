import React from "react";
import { Link } from "react-router-dom";
import home from "../../store/actions/home";
import CardHolderStyle from "./card-holder.style";
import EmptyCard from "./cards/empty.card";
import NotEmptyCard from "./cards/not-empty.card";

const CardHolder = ({ projects, heading, type, action }) => {
  switch (action) {
    case home.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL:
      return (
        <CardHolderStyle className="xs-10 xs-off-1">
          {projects.length > 0 ? (
            projects.map((p, i) => {
              return <NotEmptyCard p={p} key={i} />;
            })
          ) : (
            <h4> No Projects Found. </h4>
          )}

          <div className="xs-12">
            {type !== "all" &&
              projects.length > 12 && (
                <Link
                  className="see-all"
                  to={`/projects/all/${heading
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  See all
                </Link>
              )}
          </div>
        </CardHolderStyle>
      );

    default:
      return (
        <CardHolderStyle className="xs-10 xs-off-1">
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
        </CardHolderStyle>
      );
  }
};

export default CardHolder;
