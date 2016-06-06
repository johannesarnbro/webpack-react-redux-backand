import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import TipperPlayoffGamesSixteens from 'components/TipperPage/TipperPlayoffGamesSixteens';
import TipperPlayoffGamesQuarters from 'components/TipperPage/TipperPlayoffGamesQuarters';
import TipperPlayoffGamesSemis from 'components/TipperPage/TipperPlayoffGamesSemis';
import TipperPlayoffGamesFinal from 'components/TipperPage/TipperPlayoffGamesFinal';
import TipperPlayoffWinner from 'components/TipperPage/TipperPlayoffWinner';
import styles from './TipperPlayoffGames.less';

class BongPlayoffGames extends Component {

  render () {

    const games = this.props.games.get('response');
    const gamesSixteens = games.filter(game => game.get('stage') === 'sixteen');
    const gamesQuarters = games.filter(game => game.get('stage') === 'quarter');
    const gamesSemis = games.filter(game => game.get('stage') === 'semi');
    const gameFinal = games.filter(game => game.get('stage') === 'final');
    const locations = this.props.locations.get('response');
    const teams = this.props.teams.get('response').sortBy(team => team.get('name'));
    const bong = Immutable.fromJS(JSON.parse(this.props.user.get('bong')));

    return (
      <div className={styles.playoffList}>
        <TipperPlayoffGamesSixteens bong={bong}
                                    gamesSixteens={gamesSixteens}
                                    locations={locations}
                                    teams={teams}/>
        <TipperPlayoffGamesQuarters bong={bong}
                                    gamesQuarters={gamesQuarters}
                                    locations={locations}
                                    teams={teams}/>
        <TipperPlayoffGamesSemis bong={bong}
                                 gamesSemis={gamesSemis}
                                 locations={locations}
                                 teams={teams}/>
        <TipperPlayoffGamesFinal bong={bong}
                                 gameFinal={gameFinal}
                                 locations={locations}
                                 teams={teams}/>
        <TipperPlayoffWinner bong={bong}
                             teams={teams}/>
      </div>
    );
  }
}

BongPlayoffGames.propTypes = {
  actions: PropTypes.object,
  bong: ImmutablePropTypes.map,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongPlayoffGames;
