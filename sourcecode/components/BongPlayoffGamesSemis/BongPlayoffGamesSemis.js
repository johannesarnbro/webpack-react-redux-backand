import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesSemis.less';

class BongPlayoffGamesSemis extends Component {

  render () {

    const { bong, gamesSemis, handlers, locations, teams } = this.props;

    const semis = gamesSemis.map((game, i) => {
      const j = i * 2;
      const city = locations.find(location => location.get('id') === game.get('location'));

      const homeId = bong.getIn(['playoff', 'semi', j]);
      const awayId = bong.getIn(['playoff', 'semi', j+1]);
      const home = teams.find(team => team.get('id') == homeId);
      const away = teams.find(team => team.get('id') == awayId);
      const checked = bong.getIn(['playoff', 'final', i]);

      return (
        <div key={game.get('id')} className={styles.game}>
          <span className={styles.city}>
            {city.get('city')} ({city.get('stadium')})
          </span>
          {(home)
            ? <div>
            <input type='radio'
                   name={`radio_semi_${i}`}
                   id={`radio_semi_${j}`}
                   onChange={handlers.setFinal}
                   value={(home) ? home.get('id') : ''}
                   checked={(checked && checked === homeId)}/>
            <label htmlFor={`radio_semi_${j}`}>{home.get('name')}</label>
          </div>
            : false}
          -
          {(away)
            ? <div>
              <input type='radio'
                     name={`radio_semi_${i}`}
                     id={`radio_semi_${j+1}`}
                     onChange={handlers.setFinal}
                     value={(away) ? away.get('id') : ''}
                     checked={(checked && checked === awayId)}/>
              <label htmlFor={`radio_semi_${j+1}`}>{away.get('name')}</label>
            </div>
            : false}
        </div>
      );
    });

    return (
      <div>
        Semis ->
        {semis}
      </div>
    );
  }
}

BongPlayoffGamesSemis.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesSemis: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  locations: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesSemis;
