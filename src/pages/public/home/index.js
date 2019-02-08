import React from "react";
import Helmet from "react-helmet";
import HomeStyle from "./home.style";
import Footer from "../../../shared-components/footer";
import Navbar from "../../../shared-components/navbar";
import LeftPane from "./left-pane";
import RightPane from "./right-pane";
import connect from "react-redux/lib/connect/connect";

const  HomePageContainer = ({show,fullscreen})=>{

    return (
      <React.Fragment>
        <Helmet>
          <title> Sela - Homepage </title>
        </Helmet>
        <Navbar />
        <HomeStyle className="xs-12">
          {fullscreen === false && (
            <LeftPane className={show ? "xs-12 sm-6" : "xs-12"} />
          )}
          {show && (
            <RightPane
              className={fullscreen ? "xs-12" : "xs-12 sm-6"}
            />
          )}
        </HomeStyle>

        <Footer />
      </React.Fragment>
    );
  
}

const mapStateToProps = state => {
  const  {show,fullscreen} = state.home.map;

  return {
    show,
    fullscreen
  };
};

export default connect(mapStateToProps)(HomePageContainer);
