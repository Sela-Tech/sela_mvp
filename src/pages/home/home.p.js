import React from "react";
import { Link } from "react-router-dom";

class HomePagePresenterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const {} = this.props;
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <div className="center-wrapper">
          <div className="center">
            <h2>Home Page goes here...</h2>
            <div>
              <Link to="/signin">Sign in</Link>
            </div>
            <div>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePagePresenterView;
