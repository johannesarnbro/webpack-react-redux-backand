import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
import Page from 'components/Page/Page';
import BongPage from 'components/BongPage/BongPage';
//import styles from './DateSwitch.less';

class DateSwitch extends Component {

  render () {
    if (isBeforeDeadline()) {
      if (this.props.user.get('user')) {
        return (
          <BongPage actions={this.props.actions}
                    bong={this.props.bong}
                    games={this.props.games}
                    locations={this.props.locations}
                    teams={this.props.teams}
                    user={this.props.user}/>
        );
      } else {
        return (
          <p>Logga in!!</p>
        );
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
  bong: ImmutablePropTypes.map,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default DateSwitch;
