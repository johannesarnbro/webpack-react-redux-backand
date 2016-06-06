import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getUserName } from 'utils/getUserName';
import styles from './Page.less';

class Page extends Component {

  componentWillMount () {
    this.props.actions.fetchTippersFromApi();
  }

  render () {
    const status = this.props.tippers.get('status');
    const tippers = this.props.tippers.get('response');

    switch (status) {
      case 'done':
        if (tippers.size) {
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
            if (this.props.me === item.get('objectId')) isMe = styles.isMe;

            return (<li key={item.get('objectId')} className={`${styles.tipper} ${isMe}`}>
              <span className={styles.tipperName}>{name}:</span>
              <span className={styles.tipperScore}>{score} <span className={styles.p}>p</span></span>
            </li>);
          });

          return (
            <section className={styles.tipperListSection}>
              <ul className={styles.tipperList}>
                {users}
              </ul>
            </section>
          );
        } else {
          return false;
        }
        break;
      case 'fetching':
        return (<p className={styles.message}>Hämtar tippare...</p>);
        break;
      case 'error':
        return (<p className={styles.message}>
          Hittade inga tippare, något måste blivit galet. Ladda om sidan och se om det hjälper.</p>);
        break;
      default:
        return false;
    }
  }
}

Page.propTypes = {
  actions: PropTypes.object,
  me: PropTypes.string,
  tippers: ImmutablePropTypes.map,
};

export default Page;
