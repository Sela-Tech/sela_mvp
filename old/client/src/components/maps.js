import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
// components
import Marker from './marker';
import GoogleMap from 'google-map-react';


export default class SimpleMap extends PureComponent {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
  };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
  };

  constructor(props) {
    super(props);
  }

  getCenter(){
    let center = [0, 0];
    this.props.markers.map((m) => {
      center[0] += m[0];
      center[1] += m[1];
    });
    return [center[0] / this.props.markers.length, center[1] / this.props.markers.length];
  }

  renderMarkers(){
    console.log('markers:', this.props.markers);
    return this.props.markers && React.Children.toArray(this.props.markers.map(function(m){
      return <Marker lat={m[0]} lng={m[1]} text={m[2]} />
    }))
  }

  render() {
    return (
       <GoogleMap
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.props.markers ? this.getCenter() : this.props.center}
        zoom={this.props.zoom}
        style={Object.assign({}, style, this.props.style)}>
        {this.renderMarkers()}
      </GoogleMap>
    );
  }
}

const style = {
  height: '40%',
  maxHeight: 250 
};