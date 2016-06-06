import React, {Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TipperPlayoffGames.less';

class TipperPlayoffGamesSixteens extends Component {

  render () {
    const {bong, gamesSixteens, teams} = this.props;

    const sixteens = gamesSixteens.map((game, i) => {
      const j = i * 2;
      const homeId = bong.getIn(['playoff', 'sixteen', j]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const awayId = bong.getIn(['playoff', 'sixteen', j + 1]);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Åttondelsfinal #{i+1}</span>
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
      <div>
        <h1 className={styles.stageHeader}>
          Åttondelsfinaler
        </h1>
        <section className={styles.stage}>
          {sixteens}
        </section>
      </div>
    );
  }
}

TipperPlayoffGamesSixteens.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesSixteens: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default TipperPlayoffGamesSixteens;
