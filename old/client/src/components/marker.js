import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


export default class Marker extends PureComponent {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  render() {
    return (
       <div style={style}>
          {this.props.text}
       </div>
    );
  }
}

const K_WIDTH = 40;
const K_HEIGHT = 40;
const style = {
	position: 'absolute',
	width: K_WIDTH,
	height: K_HEIGHT,
	left: -K_WIDTH / 2,
	top: -K_HEIGHT / 2,

	border: '5px solid #f44336',
	borderRadius: K_HEIGHT,
	backgroundColor: 'white',
	textAlign: 'center',
	color: '#3f51b5',
	fontSize: 16,
	fontWeight: 'bold',
	padding: 4
};