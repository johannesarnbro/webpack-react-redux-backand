import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoginForm from 'components/LoginForm/LoginForm';
import { Link } from 'react-router';
import { store } from 'store/store';
import { push } from 'react-router-redux';
import { getUserName } from 'utils/getUserName';
import styles from './LoginPage.less';

class LoginPage extends Component {

  componentWillUpdate (nextProps) {
    if (nextProps.user.get('user')) {
      store.dispatch(push('/'));
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
          <p className={styles.message}>
            {user.getIn(['forms', 'signup', 'status'])}
          </p>
          <LoginForm actions={this.props.actions}
                     user={this.props.user} />
        </div>
      );
    }
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default LoginPage;
