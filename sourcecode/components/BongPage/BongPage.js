import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { isBeforeDeadline } from 'utils/dates';
import BongGroupGames from 'components/BongPage/BongGroupGames';
import BongGroups from 'components/BongPage/BongGroups';
import BongPlayoffGames from 'components/BongPage/BongPlayoffGames';
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

    let submitButton;
    switch (user.get('status')) {
      case 'bongChanged':
        submitButton = (<button className={styles.button} onClick={this.handlers.sendBong}>Spara ditt tipp</button>);
        break;
      case 'bongSent':
        submitButton = (<button className={styles.disabledButton} disabled='disabled'>Ditt tipp är sparat!</button>);
        break;
      case 'bongSending':
        submitButton = (<button className={styles.button} disabled='disabled'>Sparar tippet...</button>);
        break;
      default:
        submitButton = (<button className={styles.disabledButton} disabled='disabled'>
          Inga ändringar i ditt tipp
        </button>);
    }

    if (isBeforeDeadline()) {

      if (user.get('user')) {

        if (games.get('response')
          && locations.get('response')
          && teams.get('response')
        ) {
          return (
            <section>
              <h1 className={styles.heading}>- Mitt tipp -</h1>
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
                <div className={styles.send}>
                  {submitButton}
                </div>
              </form>
            </section>
          );
        } else {
          return (
            <p className={styles.message}>Hämtar data...</p>
          )
        }
      } else {
        return (<p className={styles.message}>Registrera dig eller logga in för att fylla i ett tipp!</p>);
      }
    } else {
      if (user.get('user')) {
        return (<p>Deadline passerad</p>);
      } else {
        return false;
      }
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
