import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AnswerPlayoffGamesSixteens from 'components/AnswerPage/AnswerPlayoffGamesSixteens';
import AnswerPlayoffGamesQuarters from 'components/AnswerPage/AnswerPlayoffGamesQuarters';
import AnswerPlayoffGamesSemis from 'components/AnswerPage/AnswerPlayoffGamesSemis';
import AnswerPlayoffGamesFinal from 'components/AnswerPage/AnswerPlayoffGamesFinal';
import AnswerPlayoffWinner from 'components/AnswerPage/AnswerPlayoffWinner';
import styles from './AnswerPlayoffGames.less';

const handlers = (props) => {
  return {
    setSixteen (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGameAnswer('sixteen', id, value);
    },
    setQuarter (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGameAnswer('quarter', id, value);
    },
    setSemi (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGameAnswer('semi', id, value);
    },
    setFinal (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGameAnswer('final', id, value);
    },
    setWinner (e) {
      const id = e.target.name.replace('select_', '');
      const value = e.target.value;
      props.actions.setPlayoffGameAnswer('winner', id, value);
    },
  }
};

class AnswerPlayoffGames extends Component {

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
    const bong = this.props.user.get('tempBong');
    const handlers = this.handlers;

    return (
      <div className={styles.playoffList}>
        <AnswerPlayoffGamesSixteens bong={bong}
                                  gamesSixteens={gamesSixteens}
                                  locations={locations}
                                  teams={teams}
                                  handlers={handlers}/>
        <AnswerPlayoffGamesQuarters bong={bong}
                                  gamesQuarters={gamesQuarters}
                                  locations={locations}
                                  teams={teams}
                                  handlers={handlers}/>
        <AnswerPlayoffGamesSemis bong={bong}
                               gamesSemis={gamesSemis}
                               locations={locations}
                               teams={teams}
                               handlers={handlers}/>
        <AnswerPlayoffGamesFinal bong={bong}
                               gameFinal={gameFinal}
                               locations={locations}
                               teams={teams}
                               handlers={handlers}/>
        <AnswerPlayoffWinner bong={bong}
                             teams={teams}
                             handlers={handlers}/>
      </div>
    );
  }
}

AnswerPlayoffGames.propTypes = {
  actions: PropTypes.object,
  bong: ImmutablePropTypes.map,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default AnswerPlayoffGames;
