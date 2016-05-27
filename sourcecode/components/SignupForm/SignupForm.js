import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
import baseBongObject from 'utils/baseBongObject';
import Backendless from 'backendless';
import styles from './SignupForm.less';


const handlers = (props) => {
  return {
    submit: (e) => {
      e.preventDefault();

      const { firstName, nickName, lastName, email, password } = props.user.getIn(['forms', 'signup']).toJS() || '';

      const user = new Backendless.User();
      user.firstName = firstName;
      user.nickName = nickName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.bong = JSON.stringify(baseBongObject);
      user.admin = false;
      user.score = ',0';

      props.actions.registerUserToBackendless(user);
    },
    change: (e) => {
      const { name, value } = e.target;
      props.actions.setFormInput('signup', name, value);
    },
  }
};

class SignupForm extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {
    const { user } = this.props;
    const status = user.getIn(['forms', 'signup', 'status']);

    if (isBeforeDeadline()) {
      return (
        <section className={styles.loginSection}>
          <form onSubmit={this.handlers.submit} className={styles.loginForm}>
            <div className={styles.input}>
              <label htmlFor='firstName'>Förnamn</label>
              <input type='text'
                     name='firstName'
                     id='firstName'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <label htmlFor='nickName'>Smeknamn</label>
              <input type='text'
                     name='nickName'
                     id='nickName'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <label htmlFor='lastName'>Efternamn</label>
              <input type='text'
                     name='lastName'
                     id='lastName'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <label htmlFor='email'>Email</label>
              <input type='email'
                     name='email'
                     id='email'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <label htmlFor='password'>Lösenord</label>
              <input type='password'
                     name='password'
                     id='password'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <label htmlFor='confirmPassword'>Bekräfta lösenordet</label>
              <input type='password'
                     name='confirmPassword'
                     id='confirmPassword'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div className={styles.input}>
              <input type='submit' value={`Registrera dig`}/>
            </div>
            <div className={styles.message}>
              {(status) ? <p>{status}</p> : ''}
            </div>
          </form>
        </section>
      );
    } else {
      return (
        <div>
          Deadline passerad
        </div>
      );
    }
  }
}

SignupForm.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default SignupForm;
