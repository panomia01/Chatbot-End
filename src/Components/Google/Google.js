/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import toiletimg from "../Images/toilet.png"

var tolietvisibility = true
var mapvisibility = "visible"

let MarkerArray = [ 
  {location:{lat:  1.3378350968792068, lng: 103.7270208845623}, 
  imageIcon: "R", 
  content: `<h2>Murcia City1</h2>`},

  {location:{lat: 1.3378350968792068, lng: 103.7270208845623},content: `<h2Forest rumble1</h2>` },

  {location:{lat: 1.336351509304643, lng: 103.72679762919547},content: `<h2>Play pavillion</h2>` }

  

]

var UserLocation = { lat: 1.340970315458366, lng: 103.7247124914211}

export const origin = UserLocation;
export const destination = MarkerArray[0].location;


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toileticon : {
        url: toiletimg, // url
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }/* required */
    };  
  }

    componentDidMount() {
      this.state = {
        directions: null
    }
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }/* required */
    );
    
  }
  test() {
    this.setState({

    });

  }

  render() {
    const { toileticon } = this.state;
    const GoogleMapExample = withGoogleMap(props => (
      
      <GoogleMap
        
        defaultCenter={{ lat: 1.3375238746106763, lng: 103.72671435965779 }} /* required */
        defaultZoom={13}   /* required Zoomlevel: 13 - 16 */
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
        <Marker position = {MarkerArray[0].location} visible = {tolietvisibility} icon = {toileticon}/>
        <Marker position = {MarkerArray[0].location} visible = {tolietvisibility} icon = {toileticon}/>
      </GoogleMap>
    ));

    return (
      <div id = "map">
        
        <GoogleMapExample
 
          containerElement={<div style={{ height: `500px`, width: "500px", contentVisibility : mapvisibility}} />}
          mapElement={<div style={{ height: `100%` }} />}

        />
        
      </div>
    );
  }
}

export default Map;