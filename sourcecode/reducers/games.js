import actions from 'actions/gameActions';
import { copyStateToLocalStorage } from 'utils/syncStoreAndLocalStorage';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
});

function games (state = initialState, action) {
  switch (action.type) {
    case actions.GAMES_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.GAMES_FETCH_SUCCESS:
      copyStateToLocalStorage('games', action.response);
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
        lastUpdated: action.receivedAt,
      }));

    case actions.GAMES_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.GAMES_POPULATE_FROM_LS:
      return state.merge(fromJS({
        status: 'done',
        response: action.response,
        error: false,
      }));

    default:
      return state
  }
}

export default games;
