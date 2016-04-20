import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

const teamActions = keyMirror({
  TEAMS_FETCH_REQUEST: null,
  TEAMS_FETCH_SUCCESS: null,
  TEAMS_FETCH_FAIL: null,
  TEAMS_POPULATE_FROM_LS: null,
});

export function populateTeamsFromLocalStorage (response) {
  return {
    type: teamActions.TEAMS_POPULATE_FROM_LS,
    response,
  }
}

function fetchTeams () {
  return dispatch => {
    dispatch({
      type: teamActions.TEAMS_FETCH_REQUEST,
    });

    const dataFetched = (response) => {
      response = getImmutableFromExoticJS(response.data);
      dispatch({
        type: teamActions.TEAMS_FETCH_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const gotError = (error) => {
      dispatch({
        type: teamActions.TEAMS_FETCH_FAIL,
        error,
      })
    };

    const query = {
      options: {
        pageSize: 24,
      },
    };

    Backendless.Persistence.of('teams').find(query).then(dataFetched).catch(gotError);
  }
};

function shouldFetchTeams (state) {
  if (state.getIn(['teams', 'status']) === 'fetching') {
    return false
  } else if (state.getIn(['teams', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchTeamsFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchTeams(getState())) {
      return dispatch(fetchTeams());
    }
  }
}

export default teamActions;
