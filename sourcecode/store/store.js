import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);
const middleWares = [thunkMiddleware, reduxRouterMiddleware];
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleWares),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
(createStore);

export const store = createStoreWithMiddleware(rootReducer, Immutable.Map());
