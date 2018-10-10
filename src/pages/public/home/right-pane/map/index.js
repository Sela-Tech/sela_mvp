import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Config from "./config";
import Target from "./assets/target.svg";

import { TargetButton, Expand } from "./map-view.style";
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
    projects: this.props.projects
  };

  apiIsLoaded = (map, maps) => {
    if (map) {
      this.setState({ map, maps });

      if (this.props.centerize && Boolean(this.props.projects.length)) {
        this.recenter(null, null, this.props.projects);
      } else {
        this.getMyLocation(map, maps);
      }
    }
  };

  recenter = (m, ms, projects) => {
    const map = this.state.map ? this.state.map : m;

    if (map) {
      let pos = projects[0].location;
      map.setCenter(pos);
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
            position: new maps.LatLng(pos.lat, pos.lng)
            // icon: MyLocation
          });

          myLocation.setMap(map);
          map.setCenter(pos);
        });
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects
      });

      if (nextProps.centerize === true && nextProps.projects.length > 0) {
        this.recenter(null, null, nextProps.projects);
      }
    }
  }

  render() {
    const markers = createMarkers(this.state.projects);

    let createMapOptions = maps => {
      let dependent = () => {
        if (this.props.fullscreen) {
          return {
            mapTypeControl: true,
            scrollwheel: true
          };
        } else {
          return {
            mapTypeControl: false,
            scrollwheel: false
          };
        }
      };

      return {
        geocoderLocationOptions: {
          type: maps.GeocoderLocationType.APPROXIMATE
        },
        ...dependent(),
        streetViewControl: false,

        panControl: true,
        fullscreenControl: false
      };
    };
    return (
      <Wrapper className="xs-12 i-h">
        <React.Fragment>
          <Expand onClick={this.props.toggleFullScreen}>
            {this.props.fullscreen ? "Collapse" : "Expand"}
          </Expand>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: Config.map.googleMapsAPIKey,
              language: "en",
              region: "en"
            }}
            center={this.props.center}
            defaultZoom={this.props.zoom}
            options={createMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
            // hoveringDistance={"auto"}
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
