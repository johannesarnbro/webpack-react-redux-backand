import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'reducers'
import AppContainer from 'containers/AppContainer';
import { Page } from 'containers/PageContainer';


import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

const reduxRouterMiddleware = syncHistory(browserHistory);
const middleWares = [thunkMiddleware, reduxRouterMiddleware];
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleWares),
  window.devToolsExtension ? window.devToolsExtension() : f => f)
(createStore);
const store = createStoreWithMiddleware(rootReducer, Immutable.Map());

if (module.hot) {
  module.hot.accept('reducers', () => {
    const nextRootReducer = require('reducers');
    store.replaceReducer(nextRootReducer)
  })
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path='/' component={AppContainer}>
          <IndexRoute component={Page}/>
          <Route path=':slug'>
            <IndexRoute component={Page}/>
            <Route path='/:slug/:slug' component={Page}/>
            <Route path='/:slug/:slug/:slug' component={Page}/>
          </Route>
        </Route>
        <Route path='*' component={Page}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
