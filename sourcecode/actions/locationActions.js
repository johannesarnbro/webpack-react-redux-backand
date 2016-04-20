import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

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

function fetchLocations () {
  return dispatch => {
    dispatch({
      type: locationActions.LOCATIONS_FETCH_REQUEST,
    });

    const dataFetched = (response) => {
      response = getImmutableFromExoticJS(response.data);
      dispatch({
        type: locationActions.LOCATIONS_FETCH_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const gotError = (error) => {
      dispatch({
        type: locationActions.LOCATIONS_FETCH_FAIL,
        error,
      })
    };

    const query = {
      options: {
        pageSize: 10,
      },
    };

    Backendless.Persistence.of('locations').find(query).then(dataFetched).catch(gotError);
  };
}

function shouldFetchLocations (state) {
  if (state.getIn(['locations', 'status']) === 'fetching') {
    return false
  } else if (state.getIn(['locations', 'status']) === 'error') {
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
