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
      const user = props.user.get('user');
      const bong = JSON.stringify(props.user.get('tempBong'));
      const newUser = user.set('bong', bong);
      props.actions.sendBongToApi(newUser);
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
    this.props.actions.fetchTippersFromApi();
  }

  render () {
    const { games, locations, teams, user } = this.props;

    if (games.get('response')
      && locations.get('response')
      && teams.get('response')
    ) {
      return (
        <div>
          <div>BongPage!</div>
          <form>
            <BongGroupGames actions={this.props.actions}
                            games={this.props.games}
                            user={this.props.user}/>
            <BongGroups actions={this.props.actions}
                        games={this.props.games}
                        locations={this.props.locations}
                        teams={this.props.teams}
                        user={this.props.user}/>
            <BongPlayoffGames actions={this.props.actions}
                              games={this.props.games}
                              locations={this.props.locations}
                              teams={this.props.teams}
                              user={this.props.user}/>
            {
              (Immutable.is(user.getIn(['user', 'bong']), user.get('tempBong')))
                ? (<button className={styles.disbaledButton} disabled='disabled'>Envoyer</button>)
                : (<button className={styles.button} onClick={this.handlers.sendBong}>Envoyer</button>)
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
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongPage;
