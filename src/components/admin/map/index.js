import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: true,
      latlng: {
        lat: 10.8564835,
        lng: 106.6312885,
      },
      popup: "TMA Innovation"
    };

    this.mapRef = React.createRef();
  }
  handleClick = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };
  handleLocationFound = (e) => {
    this.setState({
        hasLocation: true,
        latlng: e.latlng,
    })
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>{this.state.popup}</Popup>
      </Marker>
    ) : null;
    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-header card-header-primary">
            <h4 className="card-title ">Bản Đồ</h4>
          </div>
          <div className="card-body">
            <Map
              center={this.state.latlng}
              length={4}
              onClick={this.handleClick}
              onLocationfound={this.handleLocationFound}
              ref={this.mapRef}
              zoom={13}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {marker}
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default MapPage;
