import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesSixteens.less';

class BongPlayoffGamesSixteens extends Component {

  render () {

    const { bong, gamesSixteens, handlers, locations, teams } = this.props;

    const teamsLeft = teams.filter(team => {
      return !bong.getIn(['playoff', 'sixteen']).find(id => id == team.get('id'));
    });

    const sixteens = gamesSixteens.map((game, i) => {
      const j = i * 2;
      const city = locations.find(location => location.get('id') === game.get('location'));
      const homeId = bong.getIn(['playoff', 'sixteen', j]);
      const home = teams.find(team => team.get('id') == homeId);
      const awayId = bong.getIn(['playoff', 'sixteen', j + 1]);
      const away = teams.find(team => team.get('id') == awayId);
      const checked = bong.getIn(['playoff', 'quarter', i]);

      return (
        <div key={game.get('id')} className={styles.game}>
          <span className={styles.city}>
            {city.get('city')} ({city.get('stadium')})
          </span>
          <select name={`select_${j}`}
                  id={`select_${j}`}
                  onChange={handlers.setSixteen}>
            {(home) ? <option value={home.get('id')}>{home.get('name')}</option> : false}
            <option value=''>-</option>
            {teamsLeft.map(team => {
              return (
                <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
              );
            })}
          </select>
          <input type='radio'
                 name={`radio_sixteen_${i}`}
                 id={`radio_sixteen_${j}`}
                 onChange={handlers.setQuarter}
                 value={(home) ? home.get('id') : ''}
                 checked={(checked && checked === homeId)}/>
          <label htmlFor={`radio_sixteen_${j}`}/>
          -
          <input type='radio'
                 name={`radio_sixteen_${i}`}
                 id={`radio_sixteen_${j+1}`}
                 onChange={handlers.setQuarter}
                 value={(away) ? away.get('id') : ''}
                 checked={(checked && checked === awayId)}/>
          <label htmlFor={`radio_sixteen_${j+1}`}/>
          <select name={`select_${j+1}`}
                  id={`select_${j+1}`}
                  onChange={handlers.setSixteen}>
            {(away) ? <option value={away.get('id')}>{away.get('name')}</option> : false}
            <option value=''>-</option>
            {teamsLeft.map(team => {
              return (
                <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
              );
            })}
          </select>
        </div>
      );
    });

    return (
      <div>
        Sixteens ->
        {sixteens}
      </div>
    );
  }
}

BongPlayoffGamesSixteens.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesSixteens: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  locations: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesSixteens;
