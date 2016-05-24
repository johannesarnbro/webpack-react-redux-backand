import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './../BongPlayoffGames/BongPlayoffGames.less';

class BongPlayoffGamesFinal extends Component {

  render () {

    const { bong, gameFinal, handlers, teams } = this.props;

    const final = gameFinal.map((game, i) => {
      const j = i * 2;
      const location = game.get('location').toJS();

      const homeId = bong.getIn(['playoff', 'final', 0]);
      const awayId = bong.getIn(['playoff', 'final', 1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);
      const checked = bong.getIn(['playoff', 'winner', i]);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.city}>
            {location.city} ({location.stadium})
          </span>
          {(home)
            ? <div className={styles.team}>
            <p className={styles.teamName}>{home.get('name')}</p>
            <input type='radio'
                   name={`radio_final_${i}`}
                   id={`radio_final_${j}`}
                   onChange={handlers.setWinner}
                   value={(home) ? home.get('objectId') : ''}
                   checked={(checked && checked === homeId)}/>
            <label htmlFor={`radio_final_${j}`}></label>
          </div>
            : <div className={styles.team}></div>}
          -
          {(away)
            ? <div className={styles.team}>
              <input type='radio'
                     name={`radio_final_${i}`}
                     id={`radio_final_${j+1}`}
                     onChange={handlers.setWinner}
                     value={(away) ? away.get('objectId') : ''}
                     checked={(checked && checked === awayId)}/>
              <label htmlFor={`radio_final_${j+1}`}></label>
            <p className={styles.teamName}>{away.get('name')}</p>
            </div>
            : <div className={styles.team}></div>}
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
