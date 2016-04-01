import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './BongGroupGames.less';

const handlers = (props) => {
  return {
    set (e) {
      const id = e.target.id.split('-');
      props.actions.setGroupGame(id[0], id[1], e.target.value);
    },
  }
};

class BongGroupGames extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {

    const games = this.props.games.get('response');
    const locations = this.props.locations.get('response');
    const teams = this.props.teams.get('response');
    const bong = this.props.bong.get('tempBong');

    const groupGames = games.filter(game => {
      return game.get('stage') === 'group';
    }).map((game, i) => {

      const id = game.get('id');
      const city = locations.find(location => location.get('id') === game.get('location'));
      const home = teams.find(team => team.get('id') === game.get('home')).get('name');
      const away = teams.find(team => team.get('id') === game.get('away')).get('name');
      const values = bong.getIn(['groupGames', i]).toJS();

      return (
        <div key={id} className={styles.game}>
          <span className={styles.city}>
            {city.get('city')}
            ({city.get('stadium')})
          </span>
          <div>
            <label htmlFor={`${id-1}-0`}>{home}</label>
            <input id={`${id-1}-0`}
                   type='text'
                   value={values[0]}
                   onChange={this.handlers.set}/>
            -
            <input id={`${id-1}-1`}
                   type='text'
                   value={values[1]}
                   onChange={this.handlers.set}/>
            <label htmlFor={`${id-1}-1`}>{away}</label>
          </div>
        </div>
      );
    });

    return (
      <div>
        GroupGames
        {groupGames}
      </div>
    );
  }
}

BongGroupGames.propTypes = {
  actions: PropTypes.object,
  bong: ImmutablePropTypes.map,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongGroupGames;
