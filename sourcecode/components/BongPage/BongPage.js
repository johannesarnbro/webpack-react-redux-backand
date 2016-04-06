import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import BongGroupGames from 'components/BongGroupGames/BongGroupGames';
import BongGroups from 'components/BongGroups/BongGroups';
import BongPlayoffGames from 'components/BongPlayoffGames/BongPlayoffGames';
import styles from './BongPage.less';

const handlers = (props) => {
  return {
    sendBong: (e) => {
      e.preventDefault();
      const bong = props.bong.get('tempBong');
      props.actions.sendBongToBackand(bong);
    },
    change: (e) => {

    },
  }
};

class BongPage extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  componentWillMount () {
    this.props.actions.fetchGamesFromApi();
    this.props.actions.fetchLocationsFromApi();
    this.props.actions.fetchTeamsFromApi();
    this.props.actions.fetchBongFromApi(this.props.user.getIn(['user', 'userId']));
  }

  render () {
    const { games, locations, teams, bong } = this.props;

    if (games.get('status') === 'done'
      && locations.get('status') === 'done'
      && teams.get('status') === 'done'
      && bong.get('status') === 'done'
    ) {
      return (
        <div>
          <div>BongPage!</div>
          <form>
            <BongGroupGames actions={this.props.actions}
                            bong={this.props.bong}
                            games={this.props.games}
                            locations={this.props.locations}
                            teams={this.props.teams}
                            user={this.props.user}/>
            <BongGroups actions={this.props.actions}
                        games={this.props.games}
                        locations={this.props.locations}
                        teams={this.props.teams}/>
            <BongPlayoffGames actions={this.props.actions}
                              bong={this.props.bong}
                              games={this.props.games}
                              locations={this.props.locations}
                              teams={this.props.teams}/>
            {
              (Immutable.is(bong.get('bong'), bong.get('tempBong')))
                ? (<button className={styles.disbaledButton} disabled='disabled'>Skicka</button>)
                : (<button className={styles.button} onClick={this.handlers.sendBong}>Skicka</button>)
            }
          </form>
        </div>
      );
    } else {
      return (
        <div>Hämtar data...</div>
      )
    }
  }
}

BongPage.propTypes = {
  actions: PropTypes.object,
  bong: ImmutablePropTypes.map,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongPage;
