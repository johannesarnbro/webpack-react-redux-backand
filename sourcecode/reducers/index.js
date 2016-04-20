import { combineReducers } from 'redux-immutable';
import games from 'reducers/games';
import locations from 'reducers/locations';
import teams from 'reducers/teams';
import tippers from 'reducers/tippers';
import user from 'reducers/user';
import router from 'reducers/route';

const rootReducer = combineReducers({
  games,
  locations,
  teams,
  tippers,
  router,
  user,
});

export default rootReducer;
