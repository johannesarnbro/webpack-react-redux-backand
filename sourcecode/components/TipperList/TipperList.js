import React, {Component} from 'react';
import {Link} from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import {getUserName} from 'utils/getUserName';
import styles from './TipperList.less';

class TipperList extends Component {

  shouldComponentUpdate(nextProps) {
    const tippers = this.props.tippers.get('response');
    const user = this.props.user.get('response');
    const _tippers = nextProps.tippers.get('response');
    const _user = nextProps.user.get('response');
    return (!Immutable.is(tippers, _tippers) || !Immutable.is(user, _user));
  }

  render () {
    const status = this.props.tippers.get('status');
    const tippers = this.props.tippers.get('response');
    const me = this.props.user.getIn(['user', 'objectId']);

    if (tippers) {
      const orderedTippersByName = tippers
        .filter(item => {
          return (item.get('firstName') !== 'Rätt');
        })
        .sortBy(item => item.get('firstName'))
        .sortBy(item => {
          let place = item.get('place') || '';
          place = parseInt(place.split(',').reverse()[1]);
          return place;
        })
        .sortBy(item => {
          let place = item.get('place') || '';
          place = parseInt(place.split(',').reverse()[0]);
          return place;
        })
        .reverse()
        .sortBy(item => {
          let score = item.get('score') || '';
          score = parseInt(score.split(',').reverse()[0]);
          return score;
        })
        .reverse()
        .reduce((memo, t, i) => {

          if (memo.last()) {
            const prevPlace = memo.last().get('place').split(',').reverse()[0];
            const place = t.get('place').split(',').reverse()[0];

            if (prevPlace === place) {
              t = t.set('vizPlace', '');
            } else {
              t = t.set('vizPlace', i+1);
            }
          } else {
            t = t.set('vizPlace', i+1);
          }
          return memo = memo.push(t);
        }, Immutable.fromJS([]));
      // const orderedTippersByScore = orderedTippersByName.sortBy(item => {
      //   let score = item.get('score') || '';
      //   score = parseInt(score.split(',').reverse()[0]);
      //   return score;
      // }).reverse();
      const users = orderedTippersByName.map(item => {
        if (item.get('firstName') === 'Rätt') return false;
        const score = parseInt(item.get('score').split(',').reverse()[0]);
        const place = parseInt(item.get('place').split(',').reverse()[0]);
        const prevPlace = parseInt(item.get('place').split(',').reverse()[1]);
        const vizPlace = parseInt(item.get('vizPlace')) || '';
        const name = getUserName(item);

        let arrow = (<span className={styles.narr}>-</span>);
        if (place < prevPlace) {
          arrow = (<span className={styles.uarr}>&uarr;</span>);
        } else if (place > prevPlace) {
          arrow = (<span className={styles.darr}>&darr;</span>);
        }

        let isMe;
        if (me === item.get('objectId')) isMe = styles.isMe;

        return (
          <Link to={`/tippare/${item.get('firstName').toLowerCase()}-${item.get('lastName').toLowerCase()}`}
                key={item.get('objectId')}
                className={`${styles.tipper} ${isMe}`}>
            <span className={styles.tipperPlace}>{vizPlace}<span className={styles.p}>{arrow}</span></span>
            <span className={styles.tipperName}>{name}</span>
            <span className={styles.divider}></span>
            <span className={styles.tipperScore}>{score} <span className={styles.p}>p</span></span>
          </Link>
        );
      });

      return (
        <section className={styles.tipperListSection}>
          <div className={styles.tipperList}>
            {users}
          </div>
          <div className={styles.price}>
            <p>Potten:</p>
            <ul>
              <li>1:a - {(tippers.size -1) * 70}:-</li>
              <li>2:a - {(tippers.size -1) * 20}:-</li>
              <li>3:a - {(tippers.size -1) * 10}:-</li>
            </ul>
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
