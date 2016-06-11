import React, {Component} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {isBeforeDeadline} from 'utils/dates';
import styles from './TippWinners.less';

class TippWinners extends Component {

  shouldComponentUpdate(nextProps) {
    const teams = this.props.teams.get('response');
    const tippers = this.props.tippers.get('response');
    const _teams = nextProps.teams.get('response');
    const _tippers = nextProps.tippers.get('response');
    return (!Immutable.is(teams, _teams) || !Immutable.is(tippers, _tippers));
  }

  render () {
    const teams = this.props.teams.get('response');
    const tippers = this.props.tippers.get('response');

    if (teams && tippers && !isBeforeDeadline()) {
      const justTippers = tippers.filter(t => {
        return !t.get('admin');
      });

      const winners = justTippers.reduce((memo, t) => {
        const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
        return memo.push(bong.getIn(['playoff', 'winner', 0]));
      }, Immutable.fromJS([]))
        .groupBy(t => t)
        .sortBy((v, k) => v.size)
        .reverse()
        .map((v, k) => {
          const team = teams.find(t => t.get('objectId') === k);
          const style = {
            height: `${v.size*6 + 20}px`,
            width:`${v.size*6 + 20}px`,
            fontSize: `${v.size + 8}px`,
          };
          return (
            <div key={k} className={styles.winner}>
              <div className={styles.name}>{team.get('name')}</div>
              <div className={styles.ballWrap}>
                <div className={styles.ball} style={style}>{v.size}</div>
              </div>
            </div>
          );
        }).toArray();

      return (
        <section className={styles.winnersSection}>
          <h1 className={styles.stageHeader}>Vem vinner EM?</h1>
          <div className={styles.winnersList}>
            {winners}
          </div>
        </section>
      );
    } else {
      return false;
    }
  }
}

TippWinners.propTypes = {
  teams: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
};

export default TippWinners;
