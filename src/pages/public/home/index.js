import React from "react";
import Helmet from "react-helmet";
import HomeStyle from "./home.style";
import Footer from "../../../shared-components/footer";
import Navbar from "../../../shared-components/navbar";
import LeftPane from "./left-pane";
import RightPane from "./right-pane";
import { connect } from "react-redux";

class HomePageContainer extends React.Component {
  render() {
    console.log(this.props.showMap);

    return (
      <React.Fragment>
        <Helmet>
          <title> Sela - Homepage </title>
        </Helmet>
        <Navbar />
        <HomeStyle className="xs-12">
          {this.props.fullscreen === false && (
            <LeftPane className={this.props.showMap ? "xs-12 sm-6" : "xs-12"} />
          )}
          {this.props.showMap && (
            <RightPane
              className={this.props.fullscreen ? "xs-12" : "xs-12 sm-6"}
            />
          )}
        </HomeStyle>

        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    showMap: state.home.map.show,
    fullscreen: state.home.map.fullscreen
  };
};

export default connect(mapStateToProps)(HomePageContainer);
