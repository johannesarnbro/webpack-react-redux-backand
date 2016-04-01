import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongPlayoffGames.less';

const handlers = (props) => {
  return {

  }
};

class BongPlayoffGames extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {

    const games = this.props.games.get('response');

    const printGames = (games) => {
      const locations = this.props.locations.get('response');
      const teams = this.props.teams.get('response').sortBy(team => team.get('name'));

      return games.map(game => {
        const city = locations.find(location => location.get('id') === game.get('location'));

        return (
          <div key={game.get('id')} className={styles.game}>
            <span className={styles.city}>
              {city.get('city')} ({city.get('stadium')})
            </span>
            <select name={game.get('id')} id={game.get('id')}>
              <option value=''>-</option>
              {teams.map(team => {
                return (
                  <option key={team.get('id')} value={team.get('id')}>{team.get('name')}</option>
                );
              })}
            </select>
          </div>
        );
      });
    };

    const sixteen = printGames(games.filter(game => game.get('stage') === 'sixteen'));
    //const quarter = games.filter(game => game.get('stage') === 'quarter');
    //const semi = games.filter(game => game.get('stage') === 'semi');
    //const final = games.filter(game => game.get('stage') === 'final');

    return (
      <div>
        GroupGames
        {sixteen}
      </div>
    );
  }
}

BongPlayoffGames.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongPlayoffGames;
