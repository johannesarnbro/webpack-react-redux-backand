import keyMirror from 'keyMirror';
import backand from 'api/backand';

const userActions = keyMirror({
  USERS_FETCH_REQUEST: null,
  USERS_FETCH_SUCCESS: null,
  USERS_FETCH_FAIL: null,
});

function usersFetchRequest () {
  return {
    type: userActions.USERS_FETCH_REQUEST,
  }
}

function usersFetchSuccess (response) {
  return {
    type: userActions.USERS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function usersFetchFail (error) {
  return {
    type: userActions.USERS_FETCH_FAIL,
    error,
  }
}

function fetchUsers () {
  return dispatch => {
    dispatch(usersFetchRequest());
    return backand.get(`/1/query/data/publicUsers`)
      .then(function (json) {
        dispatch(usersFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(usersFetchFail(error));
      });
  };
}

function shouldFetchUsers (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['users', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['users', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchUsersFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
      return dispatch(fetchUsers());
    }
  }
}

export default userActions;
