import keyMirror from 'keyMirror';
import backand from 'api/backand';

const gameActions = keyMirror({
  GAMES_FETCH_REQUEST: null,
  GAMES_FETCH_SUCCESS: null,
  GAMES_FETCH_FAIL: null,
  GAMES_POPULATE_FROM_LS: null,
});

export function populateGamesFromLocalStorage (response) {
  return {
    type: gameActions.GAMES_POPULATE_FROM_LS,
    response,
  }
}

function gamesFetchRequest () {
  return {
    type: gameActions.GAMES_FETCH_REQUEST,
  }
}

function gamesFetchSuccess (response) {
  return {
    type: gameActions.GAMES_FETCH_SUCCESS,
    response,
    receivedAt: Date.now(),
  }
}

function gamesFetchFail (error) {
  return {
    type: gameActions.GAMES_FETCH_FAIL,
    error,
  }
}

function fetchGames () {
  return dispatch => {
    dispatch(gamesFetchRequest());
    return backand.get(`/1/query/data/games`)
      .then(function (json) {
        dispatch(gamesFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(gamesFetchFail(error));
      });
  };
}

function shouldFetchGames (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['games', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['games', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchGamesFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames());
    }
  }
}

export default gameActions;
