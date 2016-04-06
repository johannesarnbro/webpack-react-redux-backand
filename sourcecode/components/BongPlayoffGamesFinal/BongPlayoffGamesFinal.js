import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesFinal.less';

class BongPlayoffGamesFinal extends Component {

  render () {

    const { bong, gameFinal, handlers, locations, teams } = this.props;

    const final = gameFinal.map((game, i) => {
      const j = i * 2;
      const city = locations.find(location => location.get('id') === game.get('location'));

      const homeId = bong.getIn(['playoff', 'final', 0]);
      const awayId = bong.getIn(['playoff', 'final', 1]);
      const home = teams.find(team => team.get('id') == homeId);
      const away = teams.find(team => team.get('id') == awayId);
      const checked = bong.getIn(['playoff', 'winner', i]);

      return (
        <div key={game.get('id')} className={styles.game}>
          <span className={styles.city}>
            {city.get('city')} ({city.get('stadium')})
          </span>
          {(home)
            ? <div>
            <input type='radio'
                   name={`radio_final_${i}`}
                   id={`radio_final_${j}`}
                   onChange={handlers.setWinner}
                   value={(home) ? home.get('id') : ''}
                   checked={(checked && checked === homeId)}/>
            <label htmlFor={`radio_final_${j}`}>{home.get('name')}</label>
          </div>
            : false}
          -
          {(away)
            ? <div>
              <input type='radio'
                     name={`radio_final_${i}`}
                     id={`radio_final_${j+1}`}
                     onChange={handlers.setWinner}
                     value={(away) ? away.get('id') : ''}
                     checked={(checked && checked === awayId)}/>
              <label htmlFor={`radio_final_${j+1}`}>{away.get('name')}</label>
            </div>
            : false}
        </div>
      );
    });

    return (
      <div>
        Final ->
        {final}
      </div>
    );
  }
}

BongPlayoffGamesFinal.propTypes = {
  bong: ImmutablePropTypes.map,
  gameFinal: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  locations: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesFinal;
