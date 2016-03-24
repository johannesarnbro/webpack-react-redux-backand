import React, { Component, PropTypes } from 'react';
import styles from './App.less';

class App extends Component {

  componentDidMount () {

  }

  render () {
    //const globals = this.props.globals;
    //const status = globals.get('status');
    //const response = globals.get('response');

    return (
      <div className={styles.app}>
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
};

export default App;
