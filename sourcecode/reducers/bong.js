import actions from 'actions/bongActions';
import { copyStateToLocalStorage } from 'utils/syncStoreAndLocalStorage';
import baseBongObject from 'utils/baseBongObject';
import { fromJS } from 'immutable';

const initialState = fromJS({
  status: 'pre',
  error: false,
  bong: baseBongObject,
  tempBong: baseBongObject,
});

function bong (state = initialState, action) {
  switch (action.type) {
    case actions.BONG_FETCH_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.BONG_FETCH_SUCCESS:
      copyStateToLocalStorage('bong', action.response[0].bong);
      return state.merge(fromJS({
        status: 'done',
        error: false,
        lastUpdated: action.receivedAt,
        bong: JSON.parse(action.response[0].bong),
        tempBong: JSON.parse(action.response[0].bong),
      }));

    case actions.BONG_FETCH_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.BONG_POPULATE_FROM_LS:
      return state.merge(fromJS({
        status: 'done',
        error: false,
        bong: JSON.parse(action.response),
        tempBong: JSON.parse(action.response),
      }));

    case actions.BONG_SEND_REQUEST:
      return state.merge(fromJS({
        status: 'fetching',
        error: false,
      }));

    case actions.BONG_SEND_SUCCESS:
      copyStateToLocalStorage('bong', action.response);
      return state.merge(fromJS({
        status: 'done',
        error: false,
        bong: JSON.parse(action.response),
        tempBong: JSON.parse(action.response),
      }));

    case actions.BONG_SEND_FAIL:
      return state.merge(fromJS({
        status: 'error',
        error: fromJS(action.error),
      }));

    case actions.SET_GROUP_GAME:
      return state.setIn(
        ['tempBong', 'groupGames', action.game, action.team],
        action.value
      );

    default:
      return state
  }
}

export default bong;
