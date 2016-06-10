import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import AppContainer from 'containers/AppContainer';
import { AnswerPage } from 'containers/AnswerPageContainer';
import { Page } from 'containers/PageContainer';
import { BongPage } from 'containers/BongPageContainer';
import { TipperPage } from 'containers/TipperPageContainer';
import { SignupPage } from 'containers/SignupPageContainer';
import { LoginPage } from 'containers/LoginPageContainer';
import { store } from 'store/store';

import Backendless from 'backendless';
import config from 'webpack-config-loader!conf';
Backendless.initApp(config.AppID, config.AppSecret, config.AppVersion);
Backendless.enablePromises();

import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

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
          <Route path='/registrera'>
            <IndexRoute component={SignupPage}/>
          </Route>
          <Route path='/logga-in'>
            <IndexRoute component={LoginPage}/>
          </Route>
          <Route path='/mitt-tipp'>
            <IndexRoute component={BongPage}/>
          </Route>
          <Route path='/tippare'>
            <IndexRoute component={Page}/>
            <Route path='/*/:slug' component={TipperPage}/>
          </Route>
          <Route path='/ratt-rad'>
            <IndexRoute component={AnswerPage}/>
          </Route>
          <Route path='/*'>
            <IndexRoute component={Page}/>
            <Route path='/*' component={Page}/>
          </Route>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
