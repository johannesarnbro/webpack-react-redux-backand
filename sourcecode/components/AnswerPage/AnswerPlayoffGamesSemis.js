import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './AnswerPlayoffGames.less';

class BongPlayoffGamesSemis extends Component {

  render () {

    const { bong, gamesSemis, handlers, teams } = this.props;

    const semis = gamesSemis.map((game, i) => {
      const j = i * 2;

      const homeId = bong.getIn(['playoff', 'semi', j]);
      const awayId = bong.getIn(['playoff', 'semi', j+1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Semifinal #{i+1}</span>
          <span className={styles.gameDesc}>{`Vinnare K:${j+1} - K:${j+2}`}</span>
          <select name={`select_${j}`}
                  id={`select_${j}`}
                  onChange={handlers.setSemi}
                  className={(home) ? styles.hasValue : ''}>
            {(home) ? <option value={home.get('objectId')}>{home.get('name')}</option> : <option value=''>-</option>}
            {(home) ? <option value=''>-</option> : false}
            {teams.map(team => {
              return (
                <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
              );
            })}
          </select>
          -
          <select name={`select_${j+1}`}
                  id={`select_${j+1}`}
                  onChange={handlers.setSemi}
                  className={(away) ? styles.hasValue : ''}>
            {(away) ? <option value={away.get('objectId')}>{away.get('name')}</option> : <option value=''>-</option>}
            {(away) ? <option value=''>-</option> : false}
            {teams.map(team => {
              return (
                <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
              );
            })}
          </select>
        </div>
      );
    });

    return (
      <section>
        <h1 className={styles.stageHeader}>Semifinaler</h1>
        <div className={styles.stage}>
          {semis}
        </div>
      </section>
    );
  }
}

BongPlayoffGamesSemis.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesSemis: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesSemis;
