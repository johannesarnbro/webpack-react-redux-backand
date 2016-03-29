import keyMirror from 'keyMirror';
import backand from 'api/backand';

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

function teamsFetchRequest () {
  return {
    type: teamActions.TEAMS_FETCH_REQUEST,
  }
}

function teamsFetchSuccess (response) {
  return {
    type: teamActions.TEAMS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function teamsFetchFail (error) {
  return {
    type: teamActions.TEAMS_FETCH_FAIL,
    error,
  }
}

function fetchTeams () {
  return dispatch => {
    dispatch(teamsFetchRequest());
    return backand.get(`/1/objects/teams`)
      .then(function (json) {
        dispatch(teamsFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(teamsFetchFail(error));
      });
  };
}

function shouldFetchTeams (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['teams', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['teams', 'status']) === 'error') {
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
