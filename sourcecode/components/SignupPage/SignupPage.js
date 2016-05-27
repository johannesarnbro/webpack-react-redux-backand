import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import SignupForm from 'components/SignupForm/SignupForm';
import { store } from 'store/store';
import { push } from 'react-router-redux';
import { getUserName } from 'utils/getUserName';
import styles from './SignupPage.less';

class SignupPage extends Component {

  componentWillUpdate (nextProps) {
    if (nextProps.user.get('status') === 'registerSuccess') {
      store.dispatch(push('/logga-in'));
    }
  }

  render () {

    const { actions, user } = this.props;

    if (user.get('user')) {
      return (
        <p className={styles.message}>
          Du är inloggad som {getUserName(user.get('user'))}
          <Link to={'/'} className={styles.toStart} onClick={actions.logoutUserFromBackendless}>Logga ut</Link>
        </p>
      )
    } else {
      return (
        <div>
          <SignupForm actions={this.props.actions}
                      user={this.props.user}/>
        </div>
      );
    }
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default SignupPage;
