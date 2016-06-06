import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TipperPlayoffGames.less';

class BongPlayoffGamesSemis extends Component {

  render () {

    const { bong, gamesSemis, teams } = this.props;

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
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesSemis;
