import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoginForm from 'components/LoginForm/LoginForm';
//import styles from './LoginPage.less';

class LoginPage extends Component {

  render () {
    const { user } = this.props;

    if (user.get('user')) {
      return (
        <p>Du är inloggad som {user.getIn(['user', 'fullName'])}</p>
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
