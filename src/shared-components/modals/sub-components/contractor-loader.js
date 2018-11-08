import React from "react";
import { connect } from "react-redux";
import {
  fetchPossibleStakeholders,
  selectFunders
} from "../../../store/action-creators/project-funder/project";
import Select from "react-select";

const mapStateToProps = state => {
  return {
    funders: state.projects.funders.options
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPossibleStakeholders: () => dispatch(fetchPossibleStakeholders()),
    selectFunders: selected => dispatch(selectFunders(selected))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class FunderLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.props.fetchPossibleStakeholders();
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
      let onlyValues = selectedOption.map(o => {
        return o.value;
      });
      this.props.selectFunders(onlyValues);
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          funders: nextProps.funders
        });
      }
    }

    render() {
      const { selectedOption, funders } = this.state;
      return (
        <div
          className="form-control"
          style={{
            overflow: "unset"
          }}
        >
          <label>
            Add contractors, team members, and other funders to your project
          </label>

          <Select
            id="select-contractor"
            value={selectedOption}
            onChange={this.handleChange}
            options={funders}
            isMulti
            isSearchable
          />
        </div>
      );
    }
  }
);