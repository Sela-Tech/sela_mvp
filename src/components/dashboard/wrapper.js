import React from "react";
import Helmet from "react-helmet";

const WrapperElem = ({ children }) => {
  return <div>{children}</div>;
};

const MetaData = ({ viewName }) => {
  switch (viewName) {
    case "overview":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Overview </title>
        </Helmet>
      );

    case "projects":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Projects </title>
        </Helmet>
      );

    default:
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Dashboard </title>
        </Helmet>
      );
  }
};

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { viewName, children } = this.props;
    return (
      <WrapperElem>
        <MetaData viewName={viewName} />
        {children}
      </WrapperElem>
    );
  }
}

export default Wrapper;
