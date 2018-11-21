import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

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
          sdgs: nextProps.sdgs
        });
      }
    }

    render() {
      const { selectedOption, sdgs } = this.state;

      console.log(sdgs);
      return (
        <div className="form-control">
          <label>Associated Tags: Seperate tags with a comma.</label>

          <Select
            id="select-contractor"
            value={selectedOption}
            onChange={this.props.handleSDG}
            options={sdgs}
            isMulti
            isSearchable
          />
        </div>
      );
    }
  }
);
