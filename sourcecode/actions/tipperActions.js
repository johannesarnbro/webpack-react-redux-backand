import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

const tipperActions = keyMirror({
  TIPPERS_FETCH_REQUEST: null,
  TIPPERS_FETCH_SUCCESS: null,
  TIPPERS_FETCH_FAIL: null,
  TIPPERS_POPULATE_FROM_LS: null,
});


export function populateTippersFromLocalStorage (response) {
  return {
    type: tipperActions.TIPPERS_POPULATE_FROM_LS,
    response,
  }
}

/* FETCH TIPPERS */

function fetchTippers () {
  return dispatch => {
    dispatch({
      type: tipperActions.TIPPERS_FETCH_REQUEST,
    });

    const dataFetched = (response) => {
      response = getImmutableFromExoticJS(response.data);
      dispatch({
        type: tipperActions.TIPPERS_FETCH_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const gotError = (error) => {
      dispatch({
        type: tipperActions.TIPPERS_FETCH_FAIL,
        error,
      })
    };

    const query = {
      options: {
        pageSize: 99,
      },
    };

    Backendless.Data.of(Backendless.User).find(query).then(dataFetched).catch(gotError);
  };
}

function shouldFetchTippers (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['tippers', 'status']) === 'fetching') {
    return false
  } else if (state.getIn(['tippers', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchTippersFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchTippers(getState())) {
      return dispatch(fetchTippers());
    }
  }
}

export default tipperActions;
