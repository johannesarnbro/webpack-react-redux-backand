import React, {Component} from 'react';
import {Link} from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes';
import {getUserName} from 'utils/getUserName';
import styles from './TipperList.less';

class TipperList extends Component {

  render () {
    const status = this.props.tippers.get('status');
    const tippers = this.props.tippers.get('response');
    const me = this.props.user.getIn(['user', 'objectId']);

    if (tippers) {
      const orderedTippersByName = tippers.sortBy(item => item.get('firstName')).reverse();
      const orderedTippersByScore = orderedTippersByName.sortBy(item => {
        let score = item.get('score') || '';
        score = parseInt(score.split(',').reverse()[0]);
        return score;
      }).reverse();
      const users = orderedTippersByScore.map(item => {
        if (item.get('firstName') === 'Rätt') return false;
        const score = item.get('score').split(',').reverse()[0];
        const name = getUserName(item);

        let isMe;
        if (me === item.get('objectId')) isMe = styles.isMe;

        return (
          <Link to={`/tippare/${item.get('firstName').toLowerCase()}-${item.get('lastName').toLowerCase()}`}
                key={item.get('objectId')}
                className={`${styles.tipper} ${isMe}`}>
            <span className={styles.tipperName}>{name}:</span>
            <span className={styles.tipperScore}>{score} <span className={styles.p}>p</span></span>
          </Link>
        );
      });

      return (
        <section className={styles.tipperListSection}>
          <div className={styles.tipperList}>
            {users}
          </div>
        </section>
      );
    } else if (!tippers && status === 'fetching') {
      return (<p className={styles.message}>Hämtar tippare...</p>);
    } else if (!tippers && status === 'error') {
      return (
        <p className={styles.message}>
          Hittade inga tippare, något måste blivit galet. Ladda om sidan och se om det hjälper.
        </p>
      );
    } else {
      return false;
    }
  }
}

TipperList.propTypes = {
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default TipperList;
