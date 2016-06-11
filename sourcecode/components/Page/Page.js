import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TipperList from 'components/TipperList/TipperList';
import TodaysGames from 'components/TodaysGames/TodaysGames';
import TippWinners from 'components/TippWinners/TippWinners';
// import styles from './Page.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchTippersFromApi();
    this.props.actions.fetchGamesFromApi();
    this.props.actions.fetchTeamsFromApi();
  }

  render () {

    return (
      <div>
        <TipperList tippers={this.props.tippers}
                    user={this.props.user}/>
        <TodaysGames games={this.props.games}
                     tippers={this.props.tippers}
                     user={this.props.user}/>
        <TippWinners teams={this.props.teams}
                       tippers={this.props.tippers}/>
      </div>
    )
  }
}

Page.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default Page;
