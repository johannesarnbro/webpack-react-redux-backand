import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './Header.less';

const handlers = (props) => {
  return {
    login: (e) => {

    },
  }
};

class Header extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  render () {

    const { actions, user } = this.props;

    return (
      <div>
        <h1>Tippeligan</h1>
        <Link to='/'>Accueil</Link>
        {(user.get('user'))
          ? (
          <Link to={'/'} onClick={actions.logoutUserFromBackendless}>Se déconnecter</Link>
        )
          : (
          <Link to={'/logga-in'}>Se connecter</Link>
        )
        }
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default Header;
