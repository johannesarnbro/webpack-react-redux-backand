import keyMirror from 'keyMirror';
import Backendless from 'utils/backendless';

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
    response: response.data,
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

    const dataFetched = (data) => {
      dispatch(teamsFetchSuccess(data))
    };

    const gotError = (err) => {
      dispatch(teamsFetchFail(err))
    };

    function Teams (args = {}) {
      this.name = args.name || '';
      this.code = args.code || '';
      this.group = args.group || '';
    };

    const query = {
      options: {
        pageSize: 24,
      },
    };

    const teams = Backendless.Persistence.of(Teams);
    teams.find(query, new Backendless.Async(dataFetched, gotError));
  }
};

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
