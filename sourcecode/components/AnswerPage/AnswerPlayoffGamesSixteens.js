import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './AnswerPlayoffGames.less';

class AnswerPlayoffGamesSixteens extends Component {

  render () {
    const {bong, gamesSixteens, handlers, teams} = this.props;

    const sixteens = gamesSixteens.map((game, i) => {
      const j = i * 2;
      // const location = game.get('location').toJS();
      const homeId = bong.getIn(['playoff', 'sixteen', j]);
      const home = teams.find(team => team.get('objectId') == homeId);
      const awayId = bong.getIn(['playoff', 'sixteen', j + 1]);
      const away = teams.find(team => team.get('objectId') == awayId);

      return (
        <div key={game.get('objectId')} className={styles.game}>
          <span className={styles.gameId}>Åttondelsfinal #{i+1}</span>
          <select name={`select_${j}`}
                  id={`select_${j}`}
                  onChange={handlers.setSixteen}
                  className={(home) ? styles.hasValue : ''}>
            {(home) ? <option value={home.get('objectId')}>{home.get('name')}</option> : <option value=''>-</option>}
            {(home) ? <option value=''>-</option> : false}
            {teams.map(team => {
              return (
                <option key={team.get('objectId')} value={team.get('objectId')}>{team.get('name')}</option>
              );
            })}
          </select>
          -
          <select name={`select_${j+1}`}
                  id={`select_${j+1}`}
                  onChange={handlers.setSixteen}
                  className={(away) ? styles.hasValue : ''}>
            {(away) ? <option value={away.get('objectId')}>{away.get('name')}</option> : <option value=''>-</option>}
            {(away) ? <option value=''>-</option> : false}
            {teams.map(team => {
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
        </h1>
        <section className={styles.stage}>
          {sixteens}
        </section>
      </div>
    );
  }
}

AnswerPlayoffGamesSixteens.propTypes = {
  bong: ImmutablePropTypes.map,
  gamesSixteens: ImmutablePropTypes.list,
  handlers: PropTypes.object,
  locations: ImmutablePropTypes.list,
  teams: ImmutablePropTypes.list,
};

export default AnswerPlayoffGamesSixteens;
