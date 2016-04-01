import keyMirror from 'keyMirror';
import backand from 'api/backand';

const locationActions = keyMirror({
  LOCATIONS_FETCH_REQUEST: null,
  LOCATIONS_FETCH_SUCCESS: null,
  LOCATIONS_FETCH_FAIL: null,
  LOCATIONS_POPULATE_FROM_LS: null,
});

export function populateLocationsFromLocalStorage (response) {
  return {
    type: locationActions.LOCATIONS_POPULATE_FROM_LS,
    response,
  }
}

function locationsFetchRequest () {
  return {
    type: locationActions.LOCATIONS_FETCH_REQUEST,
  }
}

function locationsFetchSuccess (response) {
  return {
    type: locationActions.LOCATIONS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function locationsFetchFail (error) {
  return {
    type: locationActions.LOCATIONS_FETCH_FAIL,
    error,
  }
}

function fetchLocations () {
  return dispatch => {
    dispatch(locationsFetchRequest());
    return backand.get(`/1/query/data/locations`)
      .then(function (json) {
        dispatch(locationsFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(locationsFetchFail(error));
      });
  };
}

function shouldFetchLocations (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['locations', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['locations', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchLocationsFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchLocations(getState())) {
      return dispatch(fetchLocations());
    }
  }
}

export default locationActions;
