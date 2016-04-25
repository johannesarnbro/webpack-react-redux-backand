import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
import baseBongObject from 'utils/baseBongObject';
import Backendless from 'backendless';
//import styles from './LoginPage.less';


const handlers = (props) => {
  return {
    submit: (e) => {
      e.preventDefault();

      const { firstName, lastName, email, password } = props.user.getIn(['forms', 'signup']).toJS() || '';

      const user = new Backendless.User();
      user.firstName = firstName;
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
        <div>
          <h1>S'inscrire</h1>
          <form onSubmit={this.handlers.submit}>
            <div>
              <label htmlFor='firstName'>Prénom</label>
              <input type='text'
                     name='firstName'
                     id='firstName'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div>
              <label htmlFor='lastName'>Nom de famille</label>
              <input type='text'
                     name='lastName'
                     id='lastName'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input type='email'
                     name='email'
                     id='email'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div>
              <label htmlFor='password'>Mot de passe</label>
              <input type='password'
                     name='password'
                     id='password'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div>
              <label htmlFor='confirmPassword'>Confirmez le mot de passe</label>
              <input type='password'
                     name='confirmPassword'
                     id='confirmPassword'
                     onKeyUp={this.handlers.change}
                     onBlur={this.handlers.change}/>
            </div>
            <div>
              <input type='submit' value={`S'inscrire`}/>
            </div>
            <div>
              {(status) ? <p>{status}</p> : ''}
            </div>
          </form>
        </div>
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
