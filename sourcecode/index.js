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
import { DateSwitch } from 'containers/DateSwitchContainer';
import { SignupPage } from 'containers/SignupPageContainer';
import { LoginPage } from 'containers/LoginPageContainer';

import Backendless from 'utils/backendless';
import config from 'webpack-config-loader!conf';
Backendless.initApp(config.AppID, config.AppSecret, config.AppVersion);

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
          <IndexRoute component={DateSwitch}/>
          <Route path='/registrera'>
            <IndexRoute component={SignupPage}/>
          </Route>
          <Route path='/logga-in'>
            <IndexRoute component={LoginPage}/>
          </Route>
          <Route path=':slug'>
            <IndexRoute component={DateSwitch}/>
            <Route path='/:slug/:slug' component={DateSwitch}/>
            <Route path='/:slug/:slug/:slug' component={DateSwitch}/>
          </Route>
        </Route>
        <Route path='*' component={DateSwitch}/>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
