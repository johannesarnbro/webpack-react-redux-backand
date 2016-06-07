import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {isBeforeDeadline} from 'utils/dates';
import {getUserName} from 'utils/getUserName';
import TipperGroupGames from 'components/TipperPage/TipperGroupGames';
import TipperGroups from 'components/TipperPage/TipperGroups';
import TipperPlayoffGames from 'components/TipperPage/TipperPlayoffGames';
import styles from './TipperPage.less';

class TipperPage extends Component {

  componentWillMount () {
    this.props.actions.fetchGamesFromApi();
    this.props.actions.fetchLocationsFromApi();
    this.props.actions.fetchTeamsFromApi();
    this.props.actions.fetchTippersFromApi();
  }

  render () {
    const {games, locations, teams, tippers} = this.props;

    if (isBeforeDeadline()) {
      if (tippers.get('response').size) {
        const slug = this.props.routeParams.slug.toLowerCase();
        const tipper = tippers.get('response').find(t => {
          return `${t.get('firstName').toLowerCase()}-${t.get('lastName').toLowerCase()}` == slug;
        });
        return (
          <p className={styles.message}>
            När EM har startat kan du se hur {getUserName(tipper)} har tippat.
          </p>
        );
      } else {
        return false;
      }
    } else {
      if (tippers.get('response').size) {
        const slug = this.props.routeParams.slug.toLowerCase();
        const tipper = tippers.get('response').find(t => {
          return `${t.get('firstName').toLowerCase()}-${t.get('lastName').toLowerCase()}` == slug;
        });

        if (games.get('response')
          && locations.get('response')
          && teams.get('response')
          && tipper
        ) {
          return (
            <section>
              <h1 className={styles.heading}>- {getUserName(tipper)} -</h1>
              <TipperGroupGames actions={this.props.actions}
                                games={this.props.games}
                                user={tipper}/>
              <TipperGroups actions={this.props.actions}
                            games={this.props.games}
                            locations={this.props.locations}
                            teams={this.props.teams}
                            user={tipper}/>
              <TipperPlayoffGames actions={this.props.actions}
                                games={this.props.games}
                                locations={this.props.locations}
                                teams={this.props.teams}
                                user={tipper}/>
            </section>
          )
        }
      }
    }
    //
    // if (isBeforeDeadline()) {
    //
    //   if (user.get('user')) {
    //
    //     if (games.get('response')
    //       && locations.get('response')
    //       && teams.get('response')
    //     ) {
    //       return (
    //         <section>
    //           <h1 className={styles.heading}>- Mitt tipp -</h1>
    //           <form>
    //             <BongGroupGames actions={this.props.actions}
    //                             games={this.props.games}
    //                             user={this.props.user}/>
    //             <BongGroups actions={this.props.actions}
    //                         games={this.props.games}
    //                         locations={this.props.locations}
    //                         teams={this.props.teams}
    //                         user={this.props.user}/>
    //             <BongPlayoffGames actions={this.props.actions}
    //                               games={this.props.games}
    //                               locations={this.props.locations}
    //                               teams={this.props.teams}
    //                               user={this.props.user}/>
    //             <div className={styles.send}>
    //               {submitButton}
    //             </div>
    //           </form>
    //         </section>
    //       );
    //     } else {
    //       return (
    //         <p className={styles.message}>Hämtar data...</p>
    //       )
    //     }
    //   } else {
    //     return (<p className={styles.message}>Registrera dig eller logga in för att fylla i ett tipp!</p>);
    //   }
    // } else {
    //   if (user.get('user')) {
    //     return (<p>Deadline passerad</p>);
    //   } else {
    //     return false;
    //   }
    // }
  }
}

TipperPage.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  routeParams: PropTypes.object,
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default TipperPage;
