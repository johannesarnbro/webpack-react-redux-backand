import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TipperList from 'components/TipperList/TipperList';
import TodaysGames from 'components/TodaysGames/TodaysGames';
// import styles from './Page.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchTippersFromApi();
    this.props.actions.fetchGamesFromApi();
  }

  render () {

    return (
      <div>
        <TipperList tippers={this.props.tippers}
                    user={this.props.user}/>
        <TodaysGames games={this.props.games}
                     tippers={this.props.tippers}
                     user={this.props.user}/>
      </div>
    )
  }
}

Page.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default Page;
