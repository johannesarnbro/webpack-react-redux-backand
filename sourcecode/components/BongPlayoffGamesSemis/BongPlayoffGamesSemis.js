import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGamesSemis.less';

class BongPlayoffGamesSemis extends Component {

  render () {

    const { bong, gamesSemis, handlers, teams } = this.props;

    const semis = gamesSemis.map((game, i) => {
      const j = i * 2;
      const location = game.get('location').toJS();

      const homeId = bong.getIn(['playoff', 'semi', j]);
      const awayId = bong.getIn(['playoff', 'semi', j+1]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const away = teams.find(team => team.get('objectId') == awayId);
      const checked = bong.getIn(['playoff', 'final', i]);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.city}>
            {location.city} ({location.stadium})
          </span>
          {(home)
            ? <div>
            <input type='radio'
                   name={`radio_semi_${i}`}
                   id={`radio_semi_${j}`}
                   onChange={handlers.setFinal}
                   value={(home) ? home.get('objectId') : ''}
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
                     value={(away) ? away.get('objectId') : ''}
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
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesSemis;
