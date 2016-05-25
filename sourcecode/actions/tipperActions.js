import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

const tipperActions = keyMirror({
  TIPPERS_FETCH_REQUEST: null,
  TIPPERS_FETCH_SUCCESS: null,
  TIPPERS_FETCH_FAIL: null,
  TIPPERS_POPULATE_FROM_LS: null,
  TIPPER_UPDATE_POINTS_REQUEST: null,
  TIPPER_UPDATE_POINTS_SUCCESS: null,
  TIPPER_UPDATE_POINTS_FAIL: null,
});

export function populateTippersFromLocalStorage (response) {
  return {
    type: tipperActions.TIPPERS_POPULATE_FROM_LS,
    response,
  }
}


/* * * * * * * * * * * */
/*   FETCH TIPPERS     */
/* * * * * * * * * * * */

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
      properties: ['objectId', 'bong', 'score', 'firstName', 'nickName', 'lastName', 'admin'],
      options: {
        pageSize: 99,
      },
    };

    Backendless.Data.of(Backendless.User).find(query).then(dataFetched).catch(gotError);
  };
}

function shouldFetchTippers (state) {
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



/* * * * * * * * * * * */
/*   UPDATE POINTS     */
/* * * * * * * * * * * */

function updateTipper (tipper) {
  return dispatch => {
    dispatch({
      type: tipperActions.TIPPER_UPDATE_POINTS_REQUEST,
    });


    const updateTipperSuccess = (response) => {
      // console.log('response', response);
      response = getImmutableFromExoticJS(response);
      dispatch({
        type: tipperActions.TIPPER_UPDATE_POINTS_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const updateTipperFail = (error) => {
      // console.log('error', error);
      dispatch({
        type: tipperActions.TIPPER_UPDATE_POINTS_FAIL,
        error,
      })
    };


    Backendless.UserService.update(tipper.toJS()).then(updateTipperSuccess).catch(updateTipperFail);
  };
}


// function shouldSendBong (state) {
//   if (state.getIn(['bong', 'status']) === 'fetching') {
//     return false
//   } else if (state.getIn(['bong', 'status']) === 'error') {
//     return false;
//   }
//
//   return true;
// }

export function updateTipperPoints (tipper) {
  return (dispatch, getState) => {
    // if (shouldSendBong(getState())) {
    return dispatch(updateTipper(tipper));
    // }
  };
}



export default tipperActions;
