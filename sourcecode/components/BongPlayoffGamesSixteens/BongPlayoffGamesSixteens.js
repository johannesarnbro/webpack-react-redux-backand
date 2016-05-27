import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './../BongPlayoffGames/BongPlayoffGames.less';

class BongPlayoffGamesSixteens extends Component {

  render () {
    const {bong, gamesSixteens, handlers, teams} = this.props;

    const teamsLeft = teams.filter(team => {
      return !bong.getIn(['playoff', 'sixteen']).find(id => id == team.get('objectId'));
    });

    const sixteens = gamesSixteens.map((game, i) => {
      const j = i * 2;
      // const location = game.get('location').toJS();
      const homeId = bong.getIn(['playoff', 'sixteen', j]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const awayId = bong.getIn(['playoff', 'sixteen', j + 1]);
      const away = teams.find(team => team.get('objectId') == awayId);
      const checked = bong.getIn(['playoff', 'quarter', i]);

      // <span className={styles.city}>
      //       {location.city} ({location.stadium})
      //     </span>

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Åttondelsfinal #{i+1}</span>
          <select name={`select_${j}`}
                  id={`select_${j}`}
                  onChange={handlers.setSixteen}
                  className={(home) ? styles.hasValue : ''}>
            {(home) ? <option value={home.get('objectId')}>{home.get('name')}</option> : <option value=''>-</option>}
            {(home) ? <option value=''>-</option> : false}
            {teamsLeft.map(team => {
              return (
                <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
              );
            })}
          </select>
          <input type='radio'
                 name={`radio_sixteen_${i}`}
                 id={`radio_sixteen_${j}`}
                 onChange={handlers.setQuarter}
                 value={(home) ? home.get('objectId') : ''}
                 checked={(checked && checked === homeId)}/>
          <label htmlFor={`radio_sixteen_${j}`}/>
          -
          <input type='radio'
                 name={`radio_sixteen_${i}`}
                 id={`radio_sixteen_${j+1}`}
                 onChange={handlers.setQuarter}
                 value={(away) ? away.get('objectId') : ''}
                 checked={(checked && checked === awayId)}/>
          <label htmlFor={`radio_sixteen_${j+1}`}/>
          <select name={`select_${j+1}`}
                  id={`select_${j+1}`}
                  onChange={handlers.setSixteen}
                  className={(away) ? styles.hasValue : ''}>
            {(away) ? <option value={away.get('objectId')}>{away.get('name')}</option> : <option value=''>-</option>}
            {(away) ? <option value=''>-</option> : false}
            {teamsLeft.map(team => {
              return (
                <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
              );
            })}
          </select>
        </div>
      );
    });

    return (
      <div>
        <h1 className={styles.stageHeader}>
          Åttondelsfinaler
          <div>I åttondelsfinalerna är det frihet under ansvar som gäller. Alla möjliga och omöjliga matchkombinationer
            är tillåtna. Ska du safe'a eller spela för maxpoäng, det är upp till dig. Poäng erhålls för varje lag som
            tar sig vidare till åttondelsfinal.</div>
        </h1>
        <section className={styles.stage}>
          {sixteens}
        </section>
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
