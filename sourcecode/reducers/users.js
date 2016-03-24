import actions from 'actions/userActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function users (state = initialState, action) {
  switch (action.type) {
    case actions.USERS_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.USERS_FETCH_SUCCESS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.USERS_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));
    default:
      return state
  }
}

export default users;
