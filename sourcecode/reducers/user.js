import actions from 'actions/userActions';
import { fromJS } from 'immutable';
import * as Bu from 'utils/BACKANDuser';

const initialState = fromJS({
  forms: {
    login: {},
    signup: {},
  },
  user: Bu.getUser(),
});

const setFormInput = (state, action) => {
  return state.setIn(['forms', action.form, action.name], action.value)
};

function user (state = initialState, action) {

  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return state.setIn(['forms', 'login', 'status'], 'Loggar in');

    case actions.USER_LOGIN_SUCCESS:
      Bu.setUser(action.response);
      return state.merge({
        forms: {
          login: {},
        },
        user: fromJS(action.response),
      });

    case actions.USER_LOGIN_FAIL:
      return state.setIn(
        ['forms', 'login', 'status'],
        (action.error.error_description || action.error)
      );

    case actions.USER_LOGOUT:
      Bu.removeUser();
      return fromJS({});

    case actions.USER_REGISTER_REQUEST:
      return state.setIn(['forms', 'signup', 'status'], 'Förbereder tippet...');

    case actions.USER_REGISTER_SUCCESS:
      return state;

    case actions.USER_REGISTER_FAIL:
      return state.setIn(
        ['forms', 'signup', 'status'],
        (action.error.error_description || action.error)
      );

    case actions.SET_FORM_INPUT:
      return setFormInput(state, action);

    default:
      return state
  }
}

export default user;
