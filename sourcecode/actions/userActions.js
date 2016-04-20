import keyMirror from 'keyMirror';
import Backendless from 'backendless';
import getImmutableFromExoticJS from 'get-immutable-from-exotic-js';

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



export default userActions;
