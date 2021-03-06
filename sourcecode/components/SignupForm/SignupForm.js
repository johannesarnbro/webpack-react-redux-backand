import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
//import styles from './LoginPage.less';


const handlers = (props) => {
  return {
    submit: (e) => {
      e.preventDefault();

      const firstName = props.user.getIn(
          ['forms', 'signup', 'firstName']) || '';
      const lastName = props.user.getIn(['forms', 'signup', 'lastName']) || '';
      const email = props.user.getIn(['forms', 'signup', 'email']) || '';
      const password = props.user.getIn(['forms', 'signup', 'password']) || '';
      const confirmPassword = props.user.getIn(
          ['forms', 'signup', 'confirmPassword']) || '';

      const formData = {
        firstName,
        lastName,
        email,
        role: 'User',
        password,
        confirmPassword,
      };

      props.actions.registerUserToBackand(formData);
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
