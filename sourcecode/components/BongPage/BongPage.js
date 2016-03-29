import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './DateSwitch.less';

class BongPage extends Component {

  render () {

    const { user } = this.props;

    //const groupGames = '';

    if (user.get('user')) {
      return (
        <div>
          <div>BongPage!</div>
          <form>
            <article>

            </article>
          </form>
        </div>
      );
    } else {
      return (
        <Link to='/registrera'>S'inscrire</Link>
      );
    }
  }
}

BongPage.propTypes = {
  actions: PropTypes.object,
  user: ImmutablePropTypes.map,
};

export default BongPage;
