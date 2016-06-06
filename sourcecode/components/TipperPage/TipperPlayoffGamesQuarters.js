import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TipperPlayoffGames.less';

class BongPlayoffGamesQuarters extends Component {

  render () {

    const { bong, gamesQuarters, teams } = this.props;

    const quarters = gamesQuarters.map((game, i) => {
      
      const g = {};
      switch (i) {
        case 0:
          g.h = 0;
          g.a = 2;
          break;
        case 1:
          g.h = 1;
          g.a = 5;
          break;
        case 2:
          g.h = 4;
          g.a = 6;
          break;
        case 3:
          g.h = 3;
          g.a = 7;
          break;
      }

      const homeId = bong.getIn(['playoff', 'quarter', g.h]);
      const awayId = bong.getIn(['playoff', 'quarter', g.a]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Kvartfinal #{i+1}</span>
          <span className={styles.gameDesc}>{`Vinnare Å:${g.h+1} - Å:${g.a+1}`}</span>
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
        <h1 className={styles.stageHeader}>Kvartsfinaler</h1>
        <div className={styles.stage}>
          {quarters}
        </div>
      </section>
    );
  }
}

BongPlayoffGamesQuarters.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesQuarters: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesQuarters;
