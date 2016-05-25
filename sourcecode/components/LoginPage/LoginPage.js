import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoginForm from 'components/LoginForm/LoginForm';
import { Link } from 'react-router';
import styles from './LoginPage.less';

class LoginPage extends Component {

  render () {
    const { user } = this.props;

    if (user.get('user')) {
      return (
        <p className={styles.message}>
          Du är inloggad som {user.getIn(['user', 'firstName'])} <Link to={'/'} className={styles.toStart}>
          Till startsidan</Link>
        </p>
      )
    } else {
      return (
        <div>
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
