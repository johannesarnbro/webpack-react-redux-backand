import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGames.less';

class BongPlayoffGamesSemis extends Component {

  render () {

    const { bong, gamesSemis, handlers, teams } = this.props;

    const semis = gamesSemis.map((game, i) => {
      const j = i * 2;
      // const location = game.get('location').toJS();

      const homeId = bong.getIn(['playoff', 'semi', j]);
      const awayId = bong.getIn(['playoff', 'semi', j+1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);
      const checked = bong.getIn(['playoff', 'final', i]);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Semifinal #{i+1}</span>
          <span className={styles.gameDesc}>{`Vinnare K:${j+1} - K:${j+2}`}</span>
          {(home)
            ? <div className={styles.team}>
            <p className={styles.teamName}>{home.get('name')}</p>
            <input type='radio'
                   name={`radio_semi_${i}`}
                   id={`radio_semi_${j}`}
                   onChange={handlers.setFinal}
                   value={(home) ? home.get('objectId') : ''}
                   checked={(checked && checked === homeId)}/>
            <label htmlFor={`radio_semi_${j}`}></label>
          </div>
            : <div className={styles.team}></div>}
          -
          {(away)
            ? <div className={styles.team}>
              <input type='radio'
                     name={`radio_semi_${i}`}
                     id={`radio_semi_${j+1}`}
                     onChange={handlers.setFinal}
                     value={(away) ? away.get('objectId') : ''}
                     checked={(checked && checked === awayId)}/>
              <label htmlFor={`radio_semi_${j+1}`}></label>
              <p className={styles.teamName}>{away.get('name')}</p>
            </div>
            : <div className={styles.team}></div>}
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
