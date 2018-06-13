import React from "react";
import { connect } from "react-redux";
import { ViewImageWrapper } from "../../styles/dashboards/project-funder/modals/view-image";

const mapStateToProps = state => {
  const { image_to_show } = state.dashboard;
  return {
    image_to_show
  };
};

export default connect(mapStateToProps)(
  class ViewImage extends React.Component {
    state = {
      image: ""
    };

    componentWillMount() {
      this.setState({
        image: this.props.image_to_show
      });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          image: nextProps.image_to_show
        });
      }
    }

    render() {
      const { image } = this.state;

      return (
        <ViewImageWrapper className="xs-12">
          <img src={image} alt="" />
        </ViewImageWrapper>
      );
    }
  }
);
