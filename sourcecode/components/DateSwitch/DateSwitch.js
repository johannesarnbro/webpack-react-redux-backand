import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
import Page from 'components/Page/Page';
import BongPage from 'components/BongPage/BongPage';
//import styles from './DateSwitch.less';

class DateSwitch extends Component {

  componentWillMount () {
    this.props.actions.fetchGamesFromApi();
    this.props.actions.fetchLocationsFromApi();
    this.props.actions.fetchTeamsFromApi();
    this.props.actions.fetchTippersFromApi();
  }

  render () {

    const { games, locations, teams } = this.props;

    if (isBeforeDeadline()) {

      if (games.get('status') === 'done'
        && locations.get('status') === 'done'
        && teams.get('status') === 'done'
      ) {
        return (
          <BongPage actions={this.props.actions}
                    games={this.props.games}
                    locations={this.props.locations}
                    teams={this.props.teams}
                    user={this.props.user}/>
        );
      } else {
        return (
          <div>Hämtar data...</div>
        )
      }
    } else {
      return (
        <Page actions={this.props.actions}
              tippers={this.props.tippers}/>
      );
    }
  }
}

DateSwitch.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default DateSwitch;
