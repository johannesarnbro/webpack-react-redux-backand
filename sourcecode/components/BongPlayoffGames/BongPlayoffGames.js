import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BongPlayoffGamesSixteens from 'components/BongPlayoffGamesSixteens/BongPlayoffGamesSixteens';
import BongPlayoffGamesQuarters from 'components/BongPlayoffGamesQuarters/BongPlayoffGamesQuarters';
import BongPlayoffGamesSemis from 'components/BongPlayoffGamesSemis/BongPlayoffGamesSemis';
import BongPlayoffGamesFinal from 'components/BongPlayoffGamesFinal/BongPlayoffGamesFinal';
import BongPlayoffWinner from 'components/BongPlayoffWinner/BongPlayoffWinner';
//import styles from './BongPlayoffGames.less';

const handlers = (props) => {
  return {
    setSixteen (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGame('sixteen', id, value);
    },
    setQuarter (e) {
      const id = e.target.name.replace('radio_sixteen_', '');
      const value = e.target.value;
      props.actions.setPlayoffGame('quarter', id, value);
    },
    setSemi (e) {
      const id = e.target.name.replace('radio_quarter_', '');
      const value = e.target.value;
      props.actions.setPlayoffGame('semi', id, value);
    },
    setFinal (e) {
      const id = e.target.name.replace('radio_semi_', '');
      const value = e.target.value;
      props.actions.setPlayoffGame('final', id, value);
    },
    setWinner (e) {
      const id = e.target.name.replace('radio_final_', '');
      const value = e.target.value;
      props.actions.setPlayoffGame('winner', id, value);
    },
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
    const gamesSixteens = games.filter(game => game.get('stage') === 'sixteen');
    const gamesQuarters = games.filter(game => game.get('stage') === 'quarter');
    const gamesSemis = games.filter(game => game.get('stage') === 'semi');
    const gameFinal = games.filter(game => game.get('stage') === 'final');
    const locations = this.props.locations.get('response');
    const teams = this.props.teams.get('response').sortBy(team => team.get('name'));
    const bong = this.props.bong.get('tempBong');
    const handlers = this.handlers;

    return (
      <div>
        GroupGames
        <BongPlayoffGamesSixteens bong={bong}
                                  gamesSixteens={gamesSixteens}
                                  locations={locations}
                                  teams={teams}
                                  handlers={handlers}/>
        <BongPlayoffGamesQuarters bong={bong}
                                  gamesQuarters={gamesQuarters}
                                  locations={locations}
                                  teams={teams}
                                  handlers={handlers}/>
        <BongPlayoffGamesSemis bong={bong}
                               gamesSemis={gamesSemis}
                               locations={locations}
                               teams={teams}
                               handlers={handlers}/>
        <BongPlayoffGamesFinal bong={bong}
                               gameFinal={gameFinal}
                               locations={locations}
                               teams={teams}
                               handlers={handlers}/>
        <BongPlayoffWinner bong={bong}
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
