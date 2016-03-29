import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import htmlEncode from 'js-htmlencode';
//import styles from './LoginPage.less';


const handlers = (props) => {
  return {
    login: (e) => {
      e.preventDefault();

      const email = props.user.getIn(['forms', 'login', 'email']) || '';
      const password = props.user.getIn(['forms', 'login', 'password']) || '';

      let formData = `grant_type=password`;
      formData += `&username=${htmlEncode(email)}`;
      formData += `&password=${htmlEncode(password)}`;
      formData += `&appname=tippeligan`;

      //let formData = `grant_type=password`;
      //formData += `&username=johannes%40arnbro.se`;
      //formData += `&password=unwaunwaunwa`;
      //formData += `&appname=tippeligan`;

      props.actions.loginUserToBackand(formData);
    },
    change: (e) => {
      const { name, value } = e.target;
      props.actions.setFormInput('login', name, value);
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
    const status = user.getIn(['forms', 'login', 'status']);

    return (
      <div>
        <h1>S'inscrire</h1>
        <form onSubmit={this.handlers.login}>
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
            <input type='submit' value={`Se connecter`}/>
          </div>
          <div>
            {(status) ? <p>{status}</p> : ''}
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
