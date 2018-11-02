import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const TYPES = {
  UPDATE_LIST: "UPDATE_LIST",
  REQUESTING: "REQUESTING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  LOCATION: "LOCATION"
};

const initialState = {
  data: [],
  fetching: false,
  error: undefined,
  position: {
    lon: undefined,
    lat: undefined
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOCATION:
      return { ...state, position: action.payload };
    case TYPES.UPDATE_LIST:
      return { ...state, data: action.data };
    case TYPES.REQUESTING:
      return { ...state, error: undefined, fetching: true };
    case TYPES.SUCCESS:
      return { ...state, data: action.payload.data, fetching: false };
    case TYPES.FAILURE:
      return {
        ...state,
        fetching: false,
        error: "Datafetching failed"
      };
    default:
      return state;
  }
};

export const updateData = () => {
  return async dispatch => {
    dispatch({ type: TYPES.REQUESTING });
    setTimeout(async () => {
      try {
        const response = await fetch(`http://apis.is/petrol`);
        const json = await response.json();
        dispatch({ type: TYPES.SUCCESS, payload: { data: json.results } });
      } catch (e) {
        dispatch({ type: TYPES.FAILURE });
      }
    }, 5000);
  };
};

export const updateLocation = () => {
  return async dispatch => {
    navigator.geolocation.getCurrentPosition(pos => {
      dispatch({
        type: TYPES.LOCATION,
        payload: { lon: pos.coords.longitude, lat: pos.coords.latitude }
      });
    });
  };
};

export default (store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
));
