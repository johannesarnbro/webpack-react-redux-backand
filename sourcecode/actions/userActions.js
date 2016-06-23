import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

const userActions = keyMirror({
  USER_GET_REQUEST: null,
  USER_GET_SUCCESS: null,
  USER_GET_FAIL: null,
  USER_LOGIN_REQUEST: null,
  USER_LOGIN_SUCCESS: null,
  USER_LOGIN_FAIL: null,
  USER_LOGOUT_REQUEST: null,
  USER_LOGOUT_SUCCESS: null,
  USER_LOGOUT_FAIL: null,
  USER_REGISTER_REQUEST: null,
  USER_REGISTER_SUCCESS: null,
  USER_REGISTER_FAIL: null,
  USER_RESTORE_PASSWORD_REQUEST: null,
  USER_RESTORE_PASSWORD_SUCCESS: null,
  USER_RESTORE_PASSWORD_FAIL: null,
  BONG_SEND_REQUEST: null,
  BONG_SEND_SUCCESS: null,
  BONG_SEND_FAIL: null,
  SET_GROUP_GAME: null,
  SET_GROUP_ORDER: null,
  SET_PLAYOFF_GAME: null,
  SET_PLAYOFF_GAME_ANSWER: null,
  SET_FORM_INPUT: null,
  SET_FORM_STATUS: null,
  USER_POPULATE_FROM_LS: null,
});

export function populateUserFromLocalStorage (response) {
  return {
    type: userActions.USER_POPULATE_FROM_LS,
    response,
  }
}

/* * * * * * * */
/*    FORMS    */
/* * * * * * * */

export function setFormInput (form, name, value) {
  return {
    type: userActions.SET_FORM_INPUT,
    form,
    name,
    value,
  }
}

export function setFormStatus (form, status) {
  return {
    type: userActions.SET_FORM_STATUS,
    form,
    status,
  }
}

//Tried to fix that bong is not updated if using multiple browsers
// /* * * * * * * * * * */
// /* GET CURRENT USER  */
// /* * * * * * * * * * */
//
// function getUser () {
//   return dispatch => {
//     dispatch({
//       type: userActions.USER_GET_REQUEST,
//     });
//
//     const userGetSuccess = (response) => {
//       console.log('response', response);
//       dispatch({
//         type: userActions.USER_GET_SUCCESS,
//         response,
//         receivedAt: Date.now(),
//       })
//     };
//
//     const userGetFail = (error) => {
//       dispatch({
//         type: userActions.USER_GET_FAIL,
//         error,
//       })
//     };
//   };
// }
//
// export function fetchCurrentUserFromApi () {
//   return dispatch => {
//     return dispatch(getUser());
//   };
// }

/* * * * * * * */
/* LOGOUT USER */
/* * * * * * * */

function logoutUser (user) {
  return dispatch => {
    dispatch({
      type: userActions.USER_LOGOUT_REQUEST,
    });

    const userLogoutSuccess = () => {
      dispatch({
        type: userActions.USER_LOGOUT_SUCCESS,
        response: user,
        receivedAt: Date.now(),
      })
    };

    const userLogoutFail = (error) => {
      dispatch({
        type: userActions.USER_LOGOUT_FAIL,
        error,
      })
    };

    Backendless.UserService.logout().then(userLogoutSuccess).catch(userLogoutFail);

  };
}

export function logoutUserFromBackendless (user) {
  return dispatch => {
    return dispatch(logoutUser(user));
  };
}

/* * * * * * * */
/* LOGIN USER  */
/* * * * * * * */

function loginUser (user) {
  return dispatch => {
    dispatch({
      type: userActions.USER_LOGIN_REQUEST,
    });

    const userLoginSuccess = (response) => {
      response = getImmutableFromExoticJS(response);
      dispatch({
        type: userActions.USER_LOGIN_SUCCESS,
        response,
        receivedAt: Date.now(),
      })
    };

    const userLoginFail = (error) => {
      dispatch({
        type: userActions.USER_LOGIN_FAIL,
        error,
      })
    };

    Backendless.UserService.login(user.email, user.password).then(userLoginSuccess).catch(userLoginFail);
  };
}

export function loginUserToBackendless (user) {
  return dispatch => {
    return dispatch(loginUser(user));
  };
}

/* * * * * * * * */
/* REGISTER USER */
/* * * * * * * * */

function registerUser (user) {
  return dispatch => {
    dispatch({
      type: userActions.USER_REGISTER_REQUEST,
    });

    const userRegisterSuccess = (response) => {
      response = getImmutableFromExoticJS(response);
      dispatch({
        type: userActions.USER_REGISTER_SUCCESS,
        response,
        receivedAt: Date.now(),
      })
    };

    const userRegisterFail = (error) => {
      dispatch({
        type: userActions.USER_REGISTER_FAIL,
        error,
      })
    };

    Backendless.UserService.register(user).then(userRegisterSuccess).catch(userRegisterFail);
  };
}

export function registerUserToBackendless (user) {
  return dispatch => {
    return dispatch(registerUser(user));
  };
}

/* * * * * * * * * * */
/* RECOVER PASSWORD  */
/* * * * * * * * * * */

function restorePassword (user) {
  return dispatch => {
    dispatch({
      type: userActions.USER_RESTORE_PASSWORD_REQUEST,
    });

    const restorePasswordSuccess = (response) => {
      response = getImmutableFromExoticJS(response);
      dispatch({
        type: userActions.USER_RESTORE_PASSWORD_SUCCESS,
        response,
        receivedAt: Date.now(),
      })
    };

    const restorePasswordFail = (error) => {
      dispatch({
        type: userActions.USER_RESTORE_PASSWORD_FAIL,
        error,
      })
    };

    Backendless.UserService.restorePassword(user.email).then(restorePasswordSuccess).catch(restorePasswordFail);
  };
}

export function restorePasswordFromBackendless (user) {
  return dispatch => {
    return dispatch(restorePassword(user));
  };
}

/* * * * * * * * */
/*   SEND BONG   */
/* * * * * * * * */

function sendBong (newUser) {
  return dispatch => {
    dispatch({
      type: userActions.BONG_SEND_REQUEST,
    });

    const sendBongSuccess = (response) => {
      response = getImmutableFromExoticJS(response);
      dispatch({
        type: userActions.BONG_SEND_SUCCESS,
        response: response,
        receivedAt: Date.now(),
      })
    };

    const sendBongFail = (error) => {
      dispatch({
        type: userActions.BONG_SEND_FAIL,
        error,
      })
    };

    Backendless.UserService.update(newUser.toJS()).then(sendBongSuccess).catch(sendBongFail);
  };
}

function shouldSendBong (state) {
  if (state.getIn(['bong', 'status']) === 'fetching') {
    return false
  } else if (state.getIn(['bong', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function sendBongToApi (newUser) {
  return (dispatch, getState) => {
    if (shouldSendBong(getState())) {
      return dispatch(sendBong(newUser));
    }
  };
}

/* * * * * * * * */
/*   SET BONG    */
/* * * * * * * * */

export function setGroupGame (game, team, value) {
  return {
    type: userActions.SET_GROUP_GAME,
    game,
    team,
    value,
  }
}

export function setGroupOrder (group, order) {
  return {
    type: userActions.SET_GROUP_ORDER,
    group,
    order,
  }
}

export function setPlayoffGame (stage, index, value) {
  return {
    type: userActions.SET_PLAYOFF_GAME,
    stage,
    index,
    value,
  }
}

export function setPlayoffGameAnswer (stage, index, value) {
  return {
    type: userActions.SET_PLAYOFF_GAME_ANSWER,
    stage,
    index,
    value,
  }
}

export default userActions;
