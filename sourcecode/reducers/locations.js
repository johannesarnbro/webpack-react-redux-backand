import actions from 'actions/locationActions';
import { copyStateToLocalStorage } from 'utils/syncStoreAndLocalStorage';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function locations (state = initialState, action) {
  switch (action.type) {

    case actions.LOCATIONS_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.LOCATIONS_FETCH_SUCCESS:
      copyStateToLocalStorage('locations', action.response);
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));

    case actions.LOCATIONS_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.LOCATIONS_POPULATE_FROM_LS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
      }));

    default:
      return state
  }
}

export default locations;
