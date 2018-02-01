export const STOP_DATA_SUCCESS = 'STOP_DATA_SUCCESS';
export const STOP_DATA_REQUEST = 'STOP_DATA_REQUEST';
export const STOP_DATA_ERROR = 'STOP_DATA_ERROR';

export const fetchStops = () => async (dispatch) => {
  dispatch({ type : STOP_DATA_REQUEST });

  try {
    // TODO this probably shouldn't be hardcoded here...
    const response = await fetch('http://localhost:5000/stops');
    const stops = await response.json();

    dispatch(stopDataSuccess(stops));
  } catch (e) {
    dispatch({ type : STOP_DATA_ERROR });
  }
};


export const stopDataSuccess = (stops) => ({
  type : STOP_DATA_SUCCESS,
  payload : { stops }
});
