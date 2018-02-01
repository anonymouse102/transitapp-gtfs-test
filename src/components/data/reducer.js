import * as actions from './actions';
import { List, Record } from 'immutable';
import { createReducer } from '../../utils';

// I feel like Immmutablejs would go well with typescript...
const InitialState = Record({
  stops : new List()
});

const Stop = Record({
  stop_id : '',
  stop_code : '',
  stop_name : '',
  stop_desc : '',
  stop_lat : '',
  stop_lon : '',
  zone_id : '',
  stop_url : '',
  location_type : '',
  parent_station : ''
});

export default createReducer(InitialState, {
  [actions.STOP_DATA_SUCCESS] : (state, { payload }) => {
    const newStops = payload.stops.map(stop => new Stop(stop));
    return state.set('stops', new List(newStops));
  }
});
