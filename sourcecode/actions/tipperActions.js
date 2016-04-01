import keyMirror from 'keyMirror';
import backand from 'api/backand';

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

function tippersFetchRequest () {
  return {
    type: tipperActions.TIPPERS_FETCH_REQUEST,
  }
}

function tippersFetchSuccess (response) {
  return {
    type: tipperActions.TIPPERS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function tippersFetchFail (error) {
  return {
    type: tipperActions.TIPPERS_FETCH_FAIL,
    error,
  }
}

function fetchTippers (state) {
  return dispatch => {
    dispatch(tippersFetchRequest());
    return backand.get(`/1/query/data/users`)
      .then(function (json) {
        dispatch(tippersFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(tippersFetchFail(error));
      });
  };
}

function shouldFetchTippers (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['tippers', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['tippers', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchTippersFromApi () {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchTippers(state)) {
      return dispatch(fetchTippers(state));
    }
  }
}

export default tipperActions;
