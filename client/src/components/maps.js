import React, { PureComponent } from 'react';
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

  getCenter(){
    let x = this.props.markers.reduce((cX, x) => (cX + x[0]), 0);
    let y = this.props.markers.reduce((cX, x) => (cX + x[1]), 0);

    return [x / this.props.markers.length, y / this.props.markers.length];
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
        apiKey="AIzaSyBIOpqXeaA6hyLiwzLi_ozfivfbt1xHvPo" // set if you need stats etc ...
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