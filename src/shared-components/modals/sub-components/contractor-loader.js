import React from "react";
import { connect } from "react-redux";
import { selectFunders } from "../../../store/action-creators/project-funder/project";
import { fetchPossibleStakeholders } from "../../../store/action-creators/project-funder/stakeholder";

import Select from "react-select";

const mapStateToProps = state => {
  return {
    funders: state.projects.funders.options,
    projectId: state.dashboard.projectId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPossibleStakeholders: id => dispatch(fetchPossibleStakeholders(id)),
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
      this.props.fetchPossibleStakeholders(this.props.projectId);
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
