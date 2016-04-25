import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import BongGroupGames from 'components/BongGroupGames/BongGroupGames';
import BongGroups from 'components/BongGroups/BongGroups';
import BongPlayoffGames from 'components/BongPlayoffGames/BongPlayoffGames';
import updatePoints from 'utils/updatePoints';
import styles from './AnswerPage.less';

const handlers = (props) => {
  return {
    sendBong: (e) => {
      e.preventDefault();
      const user = props.user.get('user');
      const bong = JSON.stringify(props.user.get('tempBong'));
      const newUser = user.set('bong', bong);

      updatePoints(props.tippers.get('response'), props.user.get('tempBong'), props.actions);

      props.actions.sendBongToApi(newUser);
    },
    change: (e) => {

    },
  }
};

class AnswerPage extends Component {

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
    const {games, locations, teams, user} = this.props;

    const isAdmin = user.getIn(['user', 'admin']);

    if (isAdmin) {
      if (games.get('response')
        && locations.get('response')
        && teams.get('response')
      ) {
        // updatePoints(this.props.tippers.get('response'), this.props.user.get('tempBong'), this.props.actions);
        return (
          <div>
            <div>AnswerPage!</div>
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
    } else {
      return (
        <p>You are not an admin</p>
      );
    }
  }
}

AnswerPage.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default AnswerPage;
