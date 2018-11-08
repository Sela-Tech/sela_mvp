import React from "react";
import { connect } from "react-redux";
import {
  fetchPossibleTags,
  selectTags
} from "../../../store/action-creators/project-funder/tags";
import Select from "react-select";

const mapStateToProps = state => {
  return {
    tags: state.projects.tags.options
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPossibleTags: () => dispatch(fetchPossibleTags()),
    selectTags: selected => dispatch(selectTags(selected))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class TagsLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.props.fetchPossibleTags();
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
      let onlyValues = selectedOption.map(o => {
        return o.value;
      });
      this.props.selectTags(onlyValues);
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          tags: nextProps.tags
        });
      }
    }

    render() {
      const { selectedOption, tags } = this.state;
      return (
        <div
          className="form-control"
          style={{
            overflow: "unset"
          }}
        >
          <label>Associated Tags: Seperate tags with a comma.</label>

          <Select
            id="select-tags"
            value={selectedOption}
            onChange={this.handleChange}
            options={tags}
            isMulti
            isSearchable
          />
        </div>
      );
    }
  }
);
