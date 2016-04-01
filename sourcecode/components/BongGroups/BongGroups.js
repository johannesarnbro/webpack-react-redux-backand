import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './BongGroups.less';

class BongGroups extends Component {

  render () {

    //const games = this.props.games.get('response');
    //const locations = this.props.locations.get('response');
    const teams = this.props.teams.get('response');

    const groups = teams.groupBy(team => team.get('group'))
      .sortBy((teams, group) => {
        return group;
      }).map((teams, group) => {
        const items = teams.map(team => {
          return (
            <li key={team.get('id')}>
              {team.get('name')}
            </li>
          );
        });

        return (
          <div key={group}>
            <p>{group}</p>
            <ul>
              {items}
            </ul>
          </div>
        );
      }).toList();


  //.map(game => {
  //
  //    const city = locations.find(location => location.get('id') === game.get('location'));
  //    const home = teams.find(team => team.get('id') === game.get('home')).get('name');
  //    const away = teams.find(team => team.get('id') === game.get('away')).get('name');
  //
  //    return (
  //      <div key={game.get('id')} className={styles.game}>
  //        <span className={styles.city}>{city.get('city')}
  //          ({city.get('stadium')})</span>
  //        <div>
  //          <label htmlFor={home}>{home}</label>
  //          <input id={home} type="text"/>
  //          -
  //          <input id={away} type="text"/>
  //          <label htmlFor={away}>{away}</label>
  //        </div>
  //      </div>
  //    );
  //  });

    return (
      <div>
        Groups
        {groups}
      </div>
    );
  }
}

BongGroups.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongGroups;
