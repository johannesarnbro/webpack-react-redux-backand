import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Header from 'components/Header/Header';
import { populateStoreFromLocalStorage } from 'utils/syncStoreAndLocalStorage';
import styles from './App.less';

class App extends Component {

  componentWillMount () {
    populateStoreFromLocalStorage(this.props.actions);
  }

  render () {

    return (
      <div className={styles.app}>
        <Header actions={this.props.actions}
                user={this.props.user}/>
        <main className={styles.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default App;
