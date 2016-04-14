import keyMirror from 'keyMirror';
import Backendless from 'utils/backendless';

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
    response: response.data,
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

    const dataFetched = (data) => {
      dispatch(gamesFetchSuccess(data))
    };

    const gotError = (err) => {
      dispatch(gamesFetchFail(err))
    };

    function Games (args = {}) {
      this.name = args.name || '';
      this.code = args.code || '';
      this.group = args.group || '';
    };

    const query = {
      options: {
        pageSize: 51,
        relations: ['home', 'away', 'location'],
      },
    };

    const games = Backendless.Persistence.of(Games);
    games.find(query, new Backendless.Async(dataFetched, gotError));
  }
};

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
