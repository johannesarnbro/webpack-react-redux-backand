import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesFinal.less';

class BongPlayoffGamesFinal extends Component {

  render () {

    const { bong, gameFinal, handlers, teams } = this.props;

    const final = gameFinal.map((game, i) => {
      const j = i * 2;
      const location = game.get('location').toJS();

      const homeId = bong.getIn(['playoff', 'final', 0]);
      const awayId = bong.getIn(['playoff', 'final', 1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);
      const checked = bong.getIn(['playoff', 'winner', i]);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.city}>
            {location.city} ({location.stadium})
          </span>
          {(home)
            ? <div>
            <input type='radio'
                   name={`radio_final_${i}`}
                   id={`radio_final_${j}`}
                   onChange={handlers.setWinner}
                   value={(home) ? home.get('objectId') : ''}
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
                     value={(away) ? away.get('objectId') : ''}
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
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesFinal;
