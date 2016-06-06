import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TipperGroups.less';

class TipperGroups extends Component {

  render () {

    const teams = this.props.teams.get('response');
    const bong = Immutable.fromJS(JSON.parse(this.props.user.get('bong')));

    const groups = bong.get('groupOrder').map((group, i) => {

      const groupIds = ['A', 'B', 'C', 'D', 'E', 'F'];

      const items = group.map(id => {
        const team = teams.find(team => team.get('objectId') === id);
        const name = team.get('name');
        return (
          <div key={`team-${name}`} value={team} group={i} className={styles.listItem}>
            {name}
          </div>
        )
      }).toArray();

      const groupId = groupIds[i];

      return (
        <div key={`group-${groupId}`} className={styles.group}>
          <div className={styles.groupId}>Grupp {groupId}</div>
          {items}
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

TipperGroups.propTypes = {
  actions: PropTypes.object,
  games: ImmutablePropTypes.map,
  locations: ImmutablePropTypes.map,
  teams: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default TipperGroups;
