import React from "react";
import Helmet from "react-helmet";
import HomeStyle from "./home.style";
import Footer from "../../../shared-components/footer";
import Navbar from "../../../shared-components/navbar";
import LeftPane from "./left-pane";
import RightPane from "./right-pane";

class HomePageContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title> Sela - Homepage </title>
        </Helmet>

        <Navbar />
        <HomeStyle className="xs-12">
          <LeftPane />
          <RightPane />
        </HomeStyle>

        <Footer />
      </React.Fragment>
    );
  }
}

export default HomePageContainer;
