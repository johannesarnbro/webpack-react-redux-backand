import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Reorder from 'react-reorder';
import styles from './BongGroups.less';

const handlers = (props) => {
  return {
    handleSort (event, itemThatHasBeenMoved, itemsPreviousIndex, itemsNewIndex, reorderedArray) {
      const group = reorderedArray[0].props.group;
      const order = [];
      reorderedArray.map(team => {
        order.push(team.props.value.get('objectId'));
      });

      props.actions.setGroupOrder(group, Immutable.fromJS(order));
    },
  }
};

class BongGroups extends Component {

  constructor (props) {
    super(props);
    this.handlers = handlers(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.handlers = handlers(nextProps);
  }

  render () {

    const teams = this.props.teams.get('response');
    const bong = this.props.user.get('tempBong');
    const handlers = this.handlers;

    const groups = bong.get('groupOrder').map((group, i) => {

      const groupIds = ['A', 'B', 'C', 'D', 'E', 'F'];

      const items = group.map(id => {
        const team = teams.find(team => team.get('objectId') === id);
        const name = team.get('name');
        return (
          <div key={`team-${name}`} value={team} group={i}>
            {name}
          </div>
        )
      }).toArray();

      const groupId = groupIds[i];

      return (
        <div key={`group-${groupId}`} className={styles.group}>
          <div className={styles.groupId}>Grupp {groupId}</div>
          <Reorder
            itemKey='key'
            lock='horizontal'
            holdTime='50'
            list={items}
            callback={handlers.handleSort}
            listClass={`list-${i}`}
            itemClass='list-item'
          />
        </div>
      );

    });

    return (
      <section className={styles.groupGames}>
        <h1 className={styles.stageHeader}>Grupplaceringar</h1>
        <div className={styles.groupList}>
          {groups}
        </div>
      </section>
    );
  }
}

BongGroups.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default BongGroups;
