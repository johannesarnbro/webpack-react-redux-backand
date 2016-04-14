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
    const bong = this.props.bong.get('tempBong');

    const groupGames = games.filter(game => {
      return game.get('stage') === 'group';
    }).sortBy(game => game.get('number')).map((game, i) => {

      const id = game.get('number');
      const location = game.get('location').toJS();
      const home = game.get('home').toJS();
      const away = game.get('away').toJS();
      const values = bong.getIn(['groupGames', i]).toJS();

      return (
        <div key={id} className={styles.game}>
          <span className={styles.city}>
            {location.city}
            ({location.stadium})
          </span>
          <div>
            <label htmlFor={`${id-1}-0`}>{home.name}</label>
            <input id={`${id-1}-0`}
                   type='text'
                   value={values[0]}
                   onChange={this.handlers.set}/>
            -
            <input id={`${id-1}-1`}
                   type='text'
                   value={values[1]}
                   onChange={this.handlers.set}/>
            <label htmlFor={`${id-1}-1`}>{away.name}</label>
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
  user: ImmutablePropTypes.map,
};

export default BongGroupGames;
