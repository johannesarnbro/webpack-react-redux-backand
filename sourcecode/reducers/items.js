import actions from 'actions/itemActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function items (state = initialState, action) {
  switch (action.type) {
    case actions.ITEMS_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));
    case actions.ITEMS_FETCH_SUCCESS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));
    case actions.ITEMS_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));
    default:
      return state
  }
}

export default items;
