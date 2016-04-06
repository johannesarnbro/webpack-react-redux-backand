import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styles from './BongPlayoffWinner.less';

class BongPlayoffGamesWinner extends Component {

  render () {

    const { bong, teams } = this.props;

    const id = bong.getIn(['playoff', 'winner', 0]);
    const winner = teams.find(team => team.get('id') == id);


    return (
      <div>
        Winner ->
        {(winner) ? <p>{winner.get('name')}</p> : false}
      </div>
    );
  }
}

BongPlayoffGamesWinner.propTypes = {
  bong: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.list,
};

export default BongPlayoffGamesWinner;
