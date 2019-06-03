import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import config from "../../../../home/right-pane/map/config";

const MapWrpr = styled.div`
  img{
      object-fit: cover;
  }
  section {
      padding-bottom: 2em;
      h4 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
      }
  }

  height: 30em;
  margin-bottom: 1.5em;
`;

const K_WIDTH = 40;
const K_HEIGHT = 40;

const greatPlaceStyle = {
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

class MyGreatPlace extends React.Component {
    render() {
      return (
         <div style={greatPlaceStyle}>
            {this.props.text}
         </div>
      );
    }
  }

export default ({ project }) => { 
    let map_i, maps_i;

    if(project.location){
        let center = {
            lat: project.location.lat,
            lng: project.location.lng
        }

        let zoom = parseInt(config.map.defaultZoomLevel, 10)
            
        let apiIsLoaded = (map, maps) => {
            if (map) {
                map_i = map;
                maps_i = maps;
                getMyLocation(map_i, maps_i);
            }
        };

        let createMapOptions = maps => {
            let dependent = () => {
                return {
                    mapTypeControl: false,
                    scrollwheel: false
                };
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
           
        let getMyLocation = (m, ms) => {
            const map = m;
            const maps = ms;
        
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
                  map.setCenter(center);
                });
              }
            }
          };
        
        return (
        <MapWrpr className='xs-12'>

            <GoogleMapReact
            bootstrapURLKeys={{
                key: config.map.googleMapsAPIKey,
                language: "en",
                region: "en"
            }}
            center={center}
            defaultZoom={zoom}
            options={createMapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
            <MyGreatPlace lat={center.lat} lng={center.lng} text="." />
            {/* {markers} */}
            </GoogleMapReact>
        </MapWrpr>
        );
    }
    return null;
};
