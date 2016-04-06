import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesQuarters.less';

class BongPlayoffGamesQuarters extends Component {

  render () {

    const { bong, gamesQuarters, handlers, locations, teams } = this.props;

    const quarters = gamesQuarters.map((game, i) => {
      const j = i * 2;
      const city = locations.find(location => location.get('id') === game.get('location'));

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
      const home = teams.find(team => team.get('id') == homeId);
      const away = teams.find(team => team.get('id') == awayId);
      const checked = bong.getIn(['playoff', 'semi', i]);

      return (
        <div key={game.get('id')} className={styles.game}>
          <span className={styles.city}>
            {city.get('city')} ({city.get('stadium')})
          </span>
          {(home)
            ? <div>
            <input type='radio'
                   name={`radio_quarter_${i}`}
                   id={`radio_quarter_${j}`}
                   onChange={handlers.setSemi}
                   value={(home) ? home.get('id') : ''}
                   checked={(checked && checked === homeId)}/>
            <label htmlFor={`radio_quarter_${j}`}>{home.get('name')}</label>
          </div>
            : false}
          -
          {(away)
            ? <div>
            <input type='radio'
                   name={`radio_quarter_${i}`}
                   id={`radio_quarter_${j+1}`}
                   onChange={handlers.setSemi}
                   value={(away) ? away.get('id') : ''}
                   checked={(checked && checked === awayId)}/>
            <label htmlFor={`radio_quarter_${j+1}`}>{away.get('name')}</label>
          </div>
            : false}
        </div>
      );
    });

    return (
      <div>
        Quarters ->
        {quarters}
      </div>
    );
  }
}

BongPlayoffGamesQuarters.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesQuarters: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  locations: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesQuarters;
