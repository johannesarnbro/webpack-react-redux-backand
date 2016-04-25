import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './LoginPage.less';


const handlers = (props) => {
  return {
    login: (e) => {
      e.preventDefault();

      const { email, password } = props.user.getIn(['forms', 'login']).toJS() || '';

      const user = {
        email,
        password,
      };

      props.actions.loginUserToBackendless(user);
    },
    restore: (e) => {
      e.preventDefault();

      const { email } = props.user.getIn(['forms', 'restore']).toJS() || '';

      const user = {
        email,
      };

      props.actions.restorePasswordFromBackendless(user);
    },
    loginChange: (e) => {
      const { name, value } = e.target;
      props.actions.setFormInput('login', name, value);
    },
    restoreChange: (e) => {
      const { name, value } = e.target;
      props.actions.setFormInput('restore', name, value);
    },
  }
};

class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {
    const { user } = this.props;
    const loginStatus = user.getIn(['forms', 'login', 'status']);
    const restoreStatus = user.getIn(['forms', 'restore', 'status']);

    return (
      <div>
        <h1>S'inscrire</h1>
        <form onSubmit={this.handlers.login}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email'
                   name='email'
                   id='email'
                   onKeyUp={this.handlers.loginChange}
                   onBlur={this.handlers.loginChange}/>
          </div>
          <div>
            <label htmlFor='password'>Mot de passe</label>
            <input type='password'
                   name='password'
                   id='password'
                   onKeyUp={this.handlers.loginChange}
                   onBlur={this.handlers.loginChange}/>
          </div>
          <div>
            <input type='submit' value={`Se connecter`}/>
          </div>
          <div>
            {(loginStatus) ? <p>{loginStatus}</p> : ''}
          </div>
        </form>
        <form onSubmit={this.handlers.restore}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email'
                   name='email'
                   id='email'
                   onKeyUp={this.handlers.restoreChange}
                   onBlur={this.handlers.restoreChange}/>
          </div>
          <div>
            <input type='submit' value={`Se récupérer`}/>
          </div>
          <div>
            {(restoreStatus) ? <p>{restoreStatus}</p> : ''}
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default LoginForm;
