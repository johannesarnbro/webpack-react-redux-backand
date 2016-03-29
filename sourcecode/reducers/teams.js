import actions from 'actions/teamActions';
import { copyStateToLocalStorage } from 'utils/syncStoreAndLocalStorage';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function teams (state = initialState, action) {
  switch (action.type) {
    case actions.TEAMS_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.TEAMS_FETCH_SUCCESS:
      copyStateToLocalStorage('teams', action.response);
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));

    case actions.TEAMS_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.TEAMS_POPULATE_FROM_LS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
      }));

    default:
      return state
  }
}

export default teams;
