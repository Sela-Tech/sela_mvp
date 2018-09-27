import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Config from "./config";
import Target from "./assets/target.svg";
import MyLocation from "./assets/mylocation.png";
import { TargetButton } from "./map-view.style";
import createMarkers from "./markers";
import { Wrapper } from "./map-section.style";

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: parseInt(Config.map.defaultLatitude, 10),
      lng: parseInt(Config.map.defaultLongitude, 10)
    },
    zoom: parseInt(Config.map.defaultZoomLevel, 10)
  };

  state = {
    projects: []
  };

  apiIsLoaded = (map, maps) => {
    if (map) {
      this.setState({ map, maps });
      this.getMyLocation(map, maps);
    }
  };

  getMyLocation = (m, ms) => {
    const map = this.state.map ? this.state.map : m;
    const maps = this.state.maps ? this.state.maps : ms;

    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const myLocation = new maps.Marker({
            position: new maps.LatLng(pos.lat, pos.lng),
            icon: MyLocation
          });

          myLocation.setMap(map);
          map.setCenter(pos);
        });
      }
    }
  };

  createMapOptions(maps) {
    return {
      geocoderLocationOptions: {
        type: maps.GeocoderLocationType.APPROXIMATE
      },
      panControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      scrollwheel: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects
      });
    }
  }

  render() {
    const markers = createMarkers(this.state.projects);

    return (
      <Wrapper className="xs-12 i-h">
        <React.Fragment>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: Config.map.googleMapsAPIKey,
              language: "en",
              region: "en"
            }}
            center={this.props.center}
            defaultZoom={this.props.zoom}
            options={this.createMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          >
            {markers}
          </GoogleMapReact>

          <TargetButton onClick={this.getMyLocation}>
            <img src={Target} alt="target" />
          </TargetButton>
        </React.Fragment>
      </Wrapper>
    );
  }
}

export default SimpleMap;
