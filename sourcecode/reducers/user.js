import actions from 'actions/userActions';
import { fromJS } from 'immutable';
import { copyStateToLocalStorage, removeStateFromLocalStorage } from 'utils/syncStoreAndLocalStorage';

const initialState = fromJS({
  tempBong: '',
  forms: {
    login: {},
    signup: {},
    restore: {},
  },
  user: '',
  status: '',
});

const setFormInput = (state, action) => {
  return state.setIn(['forms', action.form, action.name], action.value)
};

function user (state = initialState, action) {
  
  switch (action.type) {
    case actions.USER_POPULATE_FROM_LS:
      return state.merge(fromJS({
        tempBong: action.response.get('bong'),
        user: action.response,
      }));

    case actions.USER_LOGIN_REQUEST:
      return state.setIn(['forms', 'login', 'status'], 'Loggar in');

    case actions.USER_LOGIN_SUCCESS:
      const loggedInBong = JSON.parse(action.response.get('bong'));
      const loggedInUser = action.response.set('bong', loggedInBong);
      copyStateToLocalStorage('user', loggedInUser);
      return state.merge({
        tempBong: loggedInBong,
        forms: {
          login: {},
        },
        user: loggedInUser,
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

    case actions.BONG_SEND_REQUEST:
      return state;

    case actions.BONG_SEND_SUCCESS:
      const bongSentBong = JSON.parse(action.response.get('bong'));
      const bongSentUser = action.response.set('bong', bongSentBong);
      copyStateToLocalStorage('user', bongSentUser);
      return state.merge(fromJS({
        tempBong: bongSentBong,
        user: bongSentUser,
        status: 'bongSent',
      }));

    case actions.BONG_SEND_FAIL:
      return state;

    case actions.SET_GROUP_GAME:
      const tempGroupGameState = state.set('status', 'bongChanged');
      return tempGroupGameState.setIn(['tempBong', 'groupGames', action.game, action.team], action.value);

    case actions.SET_GROUP_ORDER:
      const tempGroupOrderState = state.set('status', 'bongChanged');
      return tempGroupOrderState.setIn(['tempBong', 'groupOrder', action.group], action.order);

    case actions.SET_PLAYOFF_GAME:
      let tempState = state;
      let stages = [];
      if (action.stage === 'sixteen') {
        stages = ['semi', 'final', 'winner'];

        const newIndex = (action.index%2) ? ((action.index - 1) / 2) : (action.index / 2);
        const thisOldVal = tempState.getIn(['tempBong', 'playoff', 'sixteen', action.index]);
        const thatoldVal = tempState.getIn(['tempBong', 'playoff', 'quarter', newIndex]);

        if (thisOldVal == thatoldVal) {
          tempState = tempState.setIn(['tempBong', 'playoff', 'quarter', newIndex], action.value);
        }
      }
      if (action.stage === 'quarter') {
        stages = ['semi', 'final', 'winner'];
      }
      if (action.stage === 'semi') {
        stages = ['final', 'winner'];
      }
      if (action.stage === 'final') {
        stages = ['winner'];
      }

      stages.map(stage => {
        tempState.getIn(['tempBong', 'playoff', stage]).map((val, index) => {
          const oldVal = tempState.getIn(['tempBong', 'playoff', action.stage, action.index]);
          if (oldVal && oldVal.length && val == oldVal) {
            tempState = tempState.setIn(['tempBong', 'playoff', stage, index], '');
          }
        });
      });

      tempState = tempState.set('status', 'bongChanged');
      return tempState.setIn(['tempBong', 'playoff', action.stage, action.index], action.value);

    case actions.SET_FORM_INPUT:
      return setFormInput(state, action);

    case actions.SET_FORM_STATUS:
      return state.setIn(['forms', action.form, 'status'], (action.status || ''));

    default:
      return state
  }
}

export default user;
