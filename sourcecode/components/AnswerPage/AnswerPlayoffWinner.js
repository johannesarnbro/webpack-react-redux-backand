import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './AnswerPlayoffGames.less';

class BongPlayoffGamesWinner extends Component {

  render () {

    const { bong, teams, handlers } = this.props;

    const id = bong.getIn(['playoff', 'winner', 0]);
    const winner = teams.find(team => team.get('objectId') == id);

    const winnerSelect = (
      <div className={styles.game}>
        <select name={`select_0`}
                id={`select_0`}
                onChange={handlers.setWinner}
                className={(winner) ? styles.hasValue : ''}>
          {(winner) ? <option
            value={winner.get('objectId')}>{winner.get('name')}</option> : <option value=''>-</option>}
          {(winner) ? <option value=''>-</option> : false}
          {teams.map(team => {
            return (
              <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
            );
          })}
        </select>
      </div>
    );

    return (
      <section>
        <h1 className={styles.stageHeader}>Vinnare!</h1>
        <div>
          {winnerSelect}
        </div>
      </section>
    );
  }
}

BongPlayoffGamesWinner.propTypes = {
  bong: ImmutablePropTypes.map,
  handlers: PropTypes.object,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesWinner;
