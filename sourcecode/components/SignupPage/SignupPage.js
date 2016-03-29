import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SignupForm from 'components/SignupForm/SignupForm';
//import styles from './LoginPage.less';

class SignupPage extends Component {

  render () {
    return (
      <div>
        <SignupForm actions={this.props.actions}
                    user={this.props.user}/>
      </div>
    );
  }
}

SignupPage.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default SignupPage;
