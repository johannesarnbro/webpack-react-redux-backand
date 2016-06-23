import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './AnswerPlayoffGames.less';

class BongPlayoffGamesFinal extends Component {

  render () {

    const { bong, gameFinal, handlers, teams } = this.props;

    const final = gameFinal.map((game, i) => {
      const j = i * 2;

      const homeId = bong.getIn(['playoff', 'final', 0]);
      const awayId = bong.getIn(['playoff', 'final', 1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameDesc}>{`Vinnare S:${j+1} - S:${j+2}`}</span>
          <select name={`select_${j}`}
                  id={`select_${j}`}
                  onChange={handlers.setFinal}
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
                  onChange={handlers.setFinal}
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
        <h1 className={styles.stageHeader}>Final</h1>
        <div className={styles.stage}>
          {final}
        </div>
      </section>
    );
  }
}

BongPlayoffGamesFinal.propTypes = {
  bong: ImmutablePropTypes.map,
  gameFinal: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesFinal;
