import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

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

function fetchGames () {
  return dispatch => {
    dispatch({
      type: gameActions.GAMES_FETCH_REQUEST,
    });

    const dataFetched = (response) => {
      response = getImmutableFromExoticJS(response.data);
      dispatch({
        type: gameActions.GAMES_FETCH_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const gotError = (error) => {
      dispatch({
        type: gameActions.GAMES_FETCH_FAIL,
        error,
      })
    };

    const query = {
      options: {
        pageSize: 51,
        relations: ['home', 'away', 'location'],
      },
    };

    Backendless.Persistence.of('games').find(query).then(dataFetched).catch(gotError);
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
