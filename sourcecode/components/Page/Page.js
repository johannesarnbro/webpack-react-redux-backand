import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
          const orderedTippers = tippers.sortBy(item => {
            let score = item.get('score') || '';
            score = parseInt(score.split(',').reverse()[0]);
            return score;
          }).reverse();
          const users = orderedTippers.map(item => {
            if (item.get('firstName') === 'Rätt') return false;
            const score = item.get('score').split(',').reverse()[0];
            let name = `${item.get('firstName')} `;
            name += (item.get('nickName')) ? `"${item.get('nickName')}" ` : '';
            name += `${item.get('lastName')}`;

            return (<li key={item.get('objectId')} className={styles.tipper}>
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
  tippers: ImmutablePropTypes.map,
};

export default Page;
