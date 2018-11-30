import React from "react";
import { connect } from "react-redux";
import {Creatable as Select} from "react-select";

const mapStateToProps = state => {
  let temp = state.app.sdgs || [],
    sdgs = temp.map(s => {
      return {
        label: s.title,
        value: s.title
      };
    });
  return {
    sdgs
  };
};

export default connect(mapStateToProps)(
  class SDGLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = { sdgs: this.props.sdgs };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          sdgs: nextProps.sdgs
        });
      }
    }

    render() {
      const { selectedOption, sdgs } = this.state;

      return (
        <div className="form-control" style={{ overflow: "unset" }}>
          <label>Associated Tags: Seperate tags with a comma.</label>
          <Select
            id="select-contractor"
            value={selectedOption}
            onChange={this.props.onChange}
            options={sdgs}
            isMulti
            isSearchable
            isClearable
        
          />
        </div>
      );
    }
  }
);
