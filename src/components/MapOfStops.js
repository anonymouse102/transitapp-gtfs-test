import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

import { fetchStops } from './data/actions';
import Stop from './Stop';

const API_KEY = 'AIzaSyAZstCYT3vEJhfHWr6BXBDIutbK1X9-mVk';

class MapOfStops extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      center : new List([40.56511, -73.898583]),
      zoom : 13,
      stopsOnMap : new List()
    };
  }

  componentWillMount () {
    // TODO also query stops when the bounds change
    this.props.fetchStops();
  }

  _onChange () {
    if (!this._api) return;

    const bounds = this._api.map.getBounds();
    const zoom = this._api.map.getZoom();

    // Don't render any stops if the zoom is less than 13
    if (zoom < 13) {
      this.setState({ stopsOnMap : new List() });
      return;
    }

    const { stops } = this.props;

    const stopsOnMap = stops.filter(({ stop_lat, stop_lon }) => {
      const latLng = new this._api.maps.LatLng(stop_lat, stop_lon);
      return bounds.contains(latLng);
    });

    this.setState({ stopsOnMap });
  }

  _onApi (api) {
    this._api = api;
    this._onChange();
  }

  render () {
    return (
      <div style={{position:'absolute', width:'100%', height:'100%', top:'0px', left:'0px'}}>
        <GoogleMap
          bootstrapURLKeys={{
            key : API_KEY
          }}
          center={this.state.center.toJS()}
          zoom={this.state.zoom}
          onChange={this._onChange.bind(this)}
          onGoogleApiLoaded={this._onApi.bind(this)}
          yesIWantToUseGoogleMapApiInternals={true}
          resetBoundsOnResize={true}
          >
          {this.state.stopsOnMap.map(s =>
            <Stop
              key={s.stop_id}
              lat={s.stop_lat}
              lng={s.stop_lon}
              {...s.toJS()}
            />
          ).toJS()}
        </GoogleMap>
      </div>
    );
  }
}

MapOfStops.propTypes = {
  fetchStops : PropTypes.func.isRequired,
  stops : PropTypes.instanceOf(List)
};

export default connect(
  ({ data : { stops } }) => ({ stops }),
  { fetchStops }
)(MapOfStops);
