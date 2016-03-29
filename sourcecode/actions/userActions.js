import keyMirror from 'keyMirror';
import backand from 'api/backand';

const userActions = keyMirror({
  USER_LOGIN_REQUEST: null,
  USER_LOGIN_SUCCESS: null,
  USER_LOGIN_FAIL: null,
  USER_LOGOUT: null,
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

export function userLogout () {
  return {
    type: userActions.USER_LOGOUT,
  }
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

function loginUser (formData) {
  return dispatch => {
    dispatch(userLoginRequest());
    return backand.login(`/token`, formData)
      .then(function (json) {
        if (!json.error) {
          dispatch(userLoginSuccess(json));
        } else {
          dispatch(userLoginFail(json));
        }
      })
      .catch(function (error) {
        dispatch(userLoginFail(error));
      });
  };
}

export function loginUserToBackand (formData) {
  return dispatch => {
    return dispatch(loginUser(formData));
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

function registerUser (formData) {
  return dispatch => {
    dispatch(userRegisterRequest());
    return backand.register(`/1/user/signup`, formData)
      .then(function (json) {
        if (json.token) {
          dispatch(userRegisterSuccess(json));
        } else {
          dispatch(userRegisterFail(json));
        }
      })
      .catch(function (error) {
        dispatch(userRegisterFail(error));
      });
  };
}

export function registerUserToBackand (formData) {
  return dispatch => {
    return dispatch(registerUser(formData));
  };
}

export default userActions;
