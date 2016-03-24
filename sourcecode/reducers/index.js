import { combineReducers } from 'redux-immutable';
import items from 'reducers/items';
import users from 'reducers/users';
import router from 'reducers/route';

const rootReducer = combineReducers({
  items,
  router,
  users,
});

export default rootReducer;
