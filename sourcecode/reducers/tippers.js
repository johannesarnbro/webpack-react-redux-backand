import actions from 'actions/tipperActions';
import { copyStateToLocalStorage } from 'utils/syncStoreAndLocalStorage';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function tippers (state = initialState, action) {
  switch (action.type) {

    case actions.TIPPERS_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.TIPPERS_FETCH_SUCCESS:
      copyStateToLocalStorage('tippers', action.response);
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));

    case actions.TIPPERS_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.TIPPERS_POPULATE_FROM_LS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
      }));

    default:
      return state
  }
}

export default tippers;
