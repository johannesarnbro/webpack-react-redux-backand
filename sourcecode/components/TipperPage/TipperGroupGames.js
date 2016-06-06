import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styles from './TipperGroupGames.less';

class BongGroupGames extends Component {

  render () {
    const games = this.props.games.get('response');
    const bong = Immutable.fromJS(JSON.parse(this.props.user.get('bong')));
    
    const groupGames = games.filter(game => {
      return game.get('stage') === 'group';
    })
    .sortBy(game => game.get('number'))
    .groupBy(game => game.getIn(['home', 'group']))
    .sortBy(group => group.getIn([0, 'home', 'group']))
    .map(group => {
      const groupedGames = group.map(game => {
        const id = game.get('number');
        const location = game.get('location').toJS();
        const home = game.get('home').toJS();
        const away = game.get('away').toJS();
        const values = bong.getIn(['groupGames', id - 1]).toJS();

        return (
          <div key={id} className={styles.game}>
            <span className={styles.city}>
              {location.city}
              ({location.stadium})
            </span>
            <div className={styles.label}>{home.name}</div>
            <div className={styles.value}>
              {values[0]}
            </div>
            <span className={styles.divider}>-</span>
            <div className={styles.value}>
              {values[1]}
            </div>
            <div className={styles.label}>{away.name}</div>
          </div>
        );
      });

      return (
        <div key={`${group.getIn([0, 'home', 'group'])}`} className={styles.group}>
          <div className={styles.groupId}>Grupp {group.getIn([0, 'home', 'group'])}</div>
          {groupedGames}
        </div>
      );

    }).toArray();

    return (
      <section className={styles.groupGames}>
        <h1 className={styles.stageHeader}>Gruppspelsmatcher</h1>
        <div className={styles.groupList}>
          {groupGames}
        </div>
      </section>
    );
  }
}

BongGroupGames.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongGroupGames;
