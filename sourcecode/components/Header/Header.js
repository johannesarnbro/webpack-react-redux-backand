import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './Header.less';

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
      <div className={styles.header}>
        <Link to='/' className={styles.logo}>- Tippeligan 2016 -</Link>
        <div className={styles.separator}></div>
          {(user.get('user')) ? <Link to={`/tippare/${user
          .getIn(['user', 'firstName']).toLowerCase()}-${user.getIn(['user', 'lastName']).toLowerCase()}`}
            className={styles.buttonHighlight}>Mitt tipp</Link> : false}
        {(user.get('user')) ? <Link to={'/'} className={styles.button} onClick={actions.logoutUserFromBackendless}>
          Logga ut
        </Link> : false}
        {(!user.get('user')) ? <Link to={'/registrera'} className={styles.buttonHighlight}>
          Registrera dig</Link> : false}
        {(!user.get('user')) ? <Link to={'/logga-in'} className={styles.button}>Logga in</Link> : false}
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default Header;
