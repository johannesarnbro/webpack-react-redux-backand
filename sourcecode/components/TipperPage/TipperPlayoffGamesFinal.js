import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TipperPlayoffGames.less';

class BongPlayoffGamesFinal extends Component {

  render () {

    const { bong, gameFinal, teams } = this.props;

    const final = gameFinal.map((game, i) => {
      const j = i * 2;

      const homeId = bong.getIn(['playoff', 'final', 0]);
      const awayId = bong.getIn(['playoff', 'final', 1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameDesc}>{`Vinnare S:${j+1} - S:${j+2}`}</span>
          <div className={styles.select}>
            {home.get('name')}
          </div>
          -
          <div className={styles.select}>
            {away.get('name')}
          </div>
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
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesFinal;
