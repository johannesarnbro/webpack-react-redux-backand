import keyMirror from 'keyMirror';
import backand from 'api/backand';

const bongActions = keyMirror({
  BONG_FETCH_REQUEST: null,
  BONG_FETCH_SUCCESS: null,
  BONG_FETCH_FAIL: null,
  BONG_SEND_REQUEST: null,
  BONG_SEND_SUCCESS: null,
  BONG_SEND_FAIL: null,
  SET_FORM_INPUT: null,
  SET_GROUP_GAME: null,
  SET_PLAYOFF_GAME: null,
  BONG_POPULATE_FROM_LS: null,
});


export function populateBongFromLocalStorage (response) {
  return {
    type: bongActions.BONG_POPULATE_FROM_LS,
    response,
  }
}


export function setGroupGame (game, team, value) {
  return {
    type: bongActions.SET_GROUP_GAME,
    game,
    team,
    value,
  }
}

export function setPlayoffGame (stage, index, value) {
  return {
    type: bongActions.SET_PLAYOFF_GAME,
    stage,
    index,
    value,
  }
}

/* * * * * * * */
/* FETCH BONG  */
/* * * * * * * */

function fetchBongRequest () {
  return {
    type: bongActions.BONG_FETCH_REQUEST,
  }
}

function fetchBongSuccess (response) {
  return {
    type: bongActions.BONG_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function fetchBongFail (error) {
  return {
    type: bongActions.BONG_FETCH_FAIL,
    error,
  }
}

function fetchBong (userId) {
  return dispatch => {
    dispatch(fetchBongRequest());

    const params = {
      id: userId,
    };

    const query = encodeURIComponent(JSON.stringify(params));

    return backand.get(`/1/query/data/bong?parameters=${query}`)
      .then(function (json) {
        if (!json.error) {
          dispatch(fetchBongSuccess(json));
        } else {
          dispatch(fetchBongFail(json));
        }
      })
      .catch(function (error) {
        dispatch(fetchBongFail(error));
      });
  };
}

export function fetchBongFromApi (userId) {
  return dispatch => {
    return dispatch(fetchBong(userId));
  };
}




/* * * * * * * * */
/*   SEND BONG   */
/* * * * * * * * */

function sendBongRequest () {
  return {
    type: bongActions.BONG_SEND_REQUEST,
  }
}

function sendBongSuccess (response) {
  return {
    type: bongActions.BONG_SEND_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function sendBongFail (error) {
  return {
    type: bongActions.BONG_SEND_FAIL,
    error,
  }
}

function sendBong (bong) {
  return dispatch => {
    dispatch(sendBongRequest());
    return backand.updateBong(`/1/objects/users`, bong)
      .then(function (json) {
        if (json.bong) {
          dispatch(sendBongSuccess(json.bong));
        } else {
          dispatch(sendBongFail(json));
        }
      })
      .catch(function (error) {
        dispatch(sendBongFail(error));
      });
  };
}


function shouldSendBong (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['bong', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['bong', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function sendBongToBackand (bong) {
  return (dispatch, getState) => {
    if (shouldSendBong(getState())) {
      return dispatch(sendBong(bong));
    }
  };
}

export default bongActions;
