import keyMirror from 'keyMirror';
import backand from 'api/backand';

const itemActions = keyMirror({
  ITEMS_FETCH_REQUEST: null,
  ITEMS_FETCH_SUCCESS: null,
  ITEMS_FETCH_FAIL: null,
});

function itemsFetchRequest () {
  return {
    type: itemActions.ITEMS_FETCH_REQUEST,
  }
}

function itemsFetchSuccess (response) {
  return {
    type: itemActions.ITEMS_FETCH_SUCCESS,
    response: response,
    receivedAt: Date.now(),
  }
}

function itemsFetchFail (error) {
  return {
    type: itemActions.ITEMS_FETCH_FAIL,
    error,
  }
}

function fetchItems () {
  return dispatch => {
    dispatch(itemsFetchRequest());
    return backand.get(`/1/objects/items`)
      .then(function (json) {
        dispatch(itemsFetchSuccess(json));
      })
      .catch(function (error) {
        dispatch(itemsFetchFail(error));
      });
  };
}

function shouldFetchItems (state) {
  //if (!state.getIn(['pages', slug])) {
  //  return true
  //}
  if (state.getIn(['items', 'status']) === 'fetching') {
    return false
  }
  if (state.getIn(['items', 'status']) === 'error') {
    return false;
  }

  return true;
}

export function fetchItemsFromApi () {
  return (dispatch, getState) => {
    if (shouldFetchItems(getState())) {
      return dispatch(fetchItems());
    }
  }
}

export default itemActions;
