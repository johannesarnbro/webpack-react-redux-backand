import keyMirror from 'keyMirror';
import Backendless from 'utils/backendless';

const userActions = keyMirror({
  USER_LOGIN_REQUEST: null,
  USER_LOGIN_SUCCESS: null,
  USER_LOGIN_FAIL: null,
  USER_LOGOUT_REQUEST: null,
  USER_LOGOUT_SUCCESS: null,
  USER_LOGOUT_FAIL: null,
  USER_REGISTER_REQUEST: null,
  USER_REGISTER_SUCCESS: null,
  USER_REGISTER_FAIL: null,
  SET_FORM_INPUT: null,
});


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

/* * * * * * * */
/* LOGOUT USER */
/* * * * * * * */

function userLogoutRequest () {
  return {
    type: userActions.USER_LOGOUT_REQUEST,
  }
}

function userLogoutSuccess (response) {
  return {
    type: userActions.USER_LOGOUT_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function userLogoutFail (error) {
  return {
    type: userActions.USER_LOGOUT_FAIL,
    error,
  }
}

function logoutUser (user) {
  return dispatch => {
    dispatch(userLogoutRequest());

    const userLoggedOut = () => {
      dispatch(userLogoutSuccess(user))
    };

    const gotError = (err) => {
      dispatch(userLogoutFail(err))
    };

    Backendless.UserService.logout( new Backendless.Async( userLoggedOut, gotError ) );

  };
}

export function logoutUserFromBackand (user) {
  return dispatch => {
    return dispatch(logoutUser(user));
  };
}


/* * * * * * * */
/* LOGIN USER  */
/* * * * * * * */

function userLoginRequest () {
  return {
    type: userActions.USER_LOGIN_REQUEST,
  }
}

function userLoginSuccess (response) {
  return {
    type: userActions.USER_LOGIN_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function userLoginFail (error) {
  return {
    type: userActions.USER_LOGIN_FAIL,
    error,
  }
}

function loginUser (user) {
  return dispatch => {
    dispatch(userLoginRequest());

    const userLoggedIn = (user) => {
      dispatch(userLoginSuccess(user))
    };

    const gotError = (err) => {
      dispatch(userLoginFail(err))
    };

    Backendless.UserService.login( user.email, user.password, true, new Backendless.Async( userLoggedIn, gotError ) );

  };
}

export function loginUserToBackand (user) {
  return dispatch => {
    return dispatch(loginUser(user));
  };
}





/* * * * * * * * */
/* REGISTER USER */
/* * * * * * * * */

function userRegisterRequest () {
  return {
    type: userActions.USER_REGISTER_REQUEST,
  }
}

function userRegisterSuccess (response) {
  return {
    type: userActions.USER_REGISTER_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function userRegisterFail (error) {
  return {
    type: userActions.USER_REGISTER_FAIL,
    error,
  }
}

function registerUser (user) {
  return dispatch => {
    dispatch(userRegisterRequest());

    const userRegistered = (user) => {
      dispatch(userRegisterSuccess(user))
    };

    const gotError = (err) => {
      dispatch(userRegisterFail(err))
    };

    Backendless.UserService.register( user, new Backendless.Async( userRegistered, gotError ) );
  };
}

export function registerUserToBackand (user) {
  return dispatch => {
    return dispatch(registerUser(user));
  };
}

export default userActions;
