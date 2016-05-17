import React, {Component, PropTypes} from 'react';
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
    const bong = this.props.user.get('tempBong');

    const groupGames = games.filter(game => {
      return game.get('stage') === 'group';
    })
    .sortBy(game => game.get('number'))
    .groupBy(game => game.getIn(['home', 'group']))
    .sortBy(group => group.getIn([0, 'home', 'group']))
    .map(group => {
      const groupedGames = group.map(game => {
        const id = game.get('number');
        const location = game.get('location').toJS();
        const home = game.get('home').toJS();
        const away = game.get('away').toJS();
        const values = bong.getIn(['groupGames', id - 1]).toJS();

        return (
          <div key={id} className={styles.game}>
            <span className={styles.city}>
              {location.city}
              ({location.stadium})
            </span>
            <label htmlFor={`${id-1}-0`}>{home.name}</label>
            <input id={`${id-1}-0`}
                   type='text'
                   value={values[0]}
                   onChange={this.handlers.set}/>
            <span className={styles.divider}>-</span>
            <input id={`${id-1}-1`}
                   type='text'
                   value={values[1]}
                   onChange={this.handlers.set}/>
            <label htmlFor={`${id-1}-1`}>{away.name}</label>
          </div>
        );
      });

      return (
        <div key={`${group.getIn([0, 'home', 'group'])}`} className={styles.group}>
          <div className={styles.groupId}>{group.getIn([0, 'home', 'group'])}</div>
          {groupedGames}
        </div>
      );

    }).toArray();

    return (
      <div className={styles.groupList}>
        {groupGames}
      </div>
    );
  }
}

BongGroupGames.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongGroupGames;
