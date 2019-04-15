import React, { Component,Fragment } from "react";
// import { Link } from "react-router-dom";
import home from "../../store/actions/home";
import CardHolderStyle from "./card-holder.style";
import EmptyCard from "./cards/empty.card";
import NotEmptyCard from "./cards/not-empty.card";
import Joyride from 'react-joyride';

const CardHolder = ({ projects, heading, type, action }) => {
  switch (action) {
    case home.GET_HOMEPAGE_PROJS_S:
      return (
        <CardHolderStyle className="xs-10 xs-off-1">

          { 
            projects.length > 0 ? ( projects.map((p, i) => {
              return <NotEmptyCard p={p} key={i} />;
            })
            ) : (
              <h4> No Projects Found. </h4>
            )
          }

          {/* <div className="xs-12">
            {type !== "all" &&
              projects.length > 12 && (
                <Link
                  className="see-all"
                  to={`/projects/all/${ heading ? 
                    heading
                    .replace(" ", "-")
                    .toLowerCase()
                    :
                    ""
                  }`}
                >
                  See all
                </Link>
              )}
          </div> */}
        </CardHolderStyle>
      );

    default:
      return (
        <CardHolderStyle className="xs-10 xs-off-1">
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          <EmptyCard />
          
        </CardHolderStyle>
      );
  }
};

class WithJoyRider extends Component{
  state = {
    steps: [
      {
        target: '#completed',
        content: <p>Loads up a view that allows you to create a project on the sela platform. We are deeply integrated with the stellar network's blockchain, so project creation is known to take a couple of seconds <strong>:)</strong></p>,
      },
    ]
  }
  render(){
    return <Fragment>
      <Joyride steps={this.state.steps}/>
      <CardHolder {...this.props}/>
    </Fragment>
  }
}

export default WithJoyRider;
