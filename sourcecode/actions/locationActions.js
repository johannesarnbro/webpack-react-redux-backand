import keyMirror from 'keyMirror';
import Backendless from 'utils/backendless';

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
    response: response.data,
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

    const dataFetched = (data) => {
      dispatch(locationsFetchSuccess(data))
    };

    const gotError = (err) => {
      dispatch(locationsFetchFail(err))
    };

    function Locations(args = {}) {
      this.stadium = args.stadium || '';
      this.city = args.city || '';
    };

    const query = {
      options: {
        pageSize: 10,
      },
    };

    const locations = Backendless.Persistence.of(Locations);
    locations.find(query, new Backendless.Async(dataFetched, gotError));
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
