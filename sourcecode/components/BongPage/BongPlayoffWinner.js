import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGames.less';

class BongPlayoffGamesWinner extends Component {

  render () {

    const { bong, teams } = this.props;

    const id = bong.getIn(['playoff', 'winner', 0]);
    const winner = teams.find(team => team.get('objectId') == id);

    return (
      <section>
        <h1 className={styles.stageHeader}>Vinnare!</h1>
        <div>
          {(winner) ? <p className={styles.winner}>{winner.get('name')}</p> : false}
        </div>
      </section>
    );
  }
}

BongPlayoffGamesWinner.propTypes = {
  bong: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesWinner;
