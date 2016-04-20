import actions from 'actions/userActions';
import { fromJS } from 'immutable';
import { copyStateToLocalStorage, removeStateFromLocalStorage } from 'utils/syncStoreAndLocalStorage';

const initialState = fromJS({
  forms: {
    login: {},
    signup: {},
  },
  user: '',
});

const setFormInput = (state, action) => {
  return state.setIn(['forms', action.form, action.name], action.value)
};

function user (state = initialState, action) {
  
  switch (action.type) {
    case actions.USER_POPULATE_FROM_LS:
      return state.merge(fromJS({
        user: action.response,
      }));

    case actions.USER_LOGIN_REQUEST:
      return state.setIn(['forms', 'login', 'status'], 'Loggar in');

    case actions.USER_LOGIN_SUCCESS:
      copyStateToLocalStorage('user', action.response);
      return state.merge({
        forms: {
          login: {},
        },
        user: action.response,
      });

    case actions.USER_LOGIN_FAIL:
      return state.setIn(['forms', 'login', 'status'], (action.error.message || ''));

    case actions.USER_LOGOUT_SUCCESS:
      removeStateFromLocalStorage('user');
      return state.set('user', '');

    case actions.USER_REGISTER_REQUEST:
      return state.setIn(['forms', 'signup', 'status'], 'Förbereder tippet...');

    case actions.USER_REGISTER_SUCCESS:
      return state.setIn(['forms', 'signup', 'status'], 'Tippet färdigt!');

    case actions.USER_REGISTER_FAIL:
      return state.setIn(['forms', 'signup', 'status'], (action.error.message || ''));

    case actions.SET_FORM_INPUT:
      return setFormInput(state, action);

    case actions.SET_FORM_STATUS:
      return state.setIn(['forms', action.form, 'status'], (action.status || ''));

    default:
      return state
  }
}

export default user;
