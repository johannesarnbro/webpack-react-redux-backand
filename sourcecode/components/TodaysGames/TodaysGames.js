import React, {Component} from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {isBeforeDeadline, getTodayDate} from 'utils/dates';
// import Chart from 'chart.js';
// import {PieChart} from 'react-d3/piechart';
// const LineChart = require("react-chartjs").Line;
import Chart from 'react-chartjs';
// import {Chart} from 'react-google-charts'
// import CakeChart from 'cake-chart';
// const ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');
import styles from './TodaysGames.less';

class TodaysGames extends Component {

  shouldComponentUpdate(nextProps) {
    const games = this.props.games.get('response');
    const tippers = this.props.tippers.get('response');
    const user = this.props.user.get('response');
    const _games = nextProps.games.get('response');
    const _tippers = nextProps.tippers.get('response');
    const _user = nextProps.user.get('response');
    return (!Immutable.is(games, _games) || !Immutable.is(tippers, _tippers) || !Immutable.is(user, _user));
  }

  render () {
    const games = this.props.games.get('response');
    const tippers = this.props.tippers.get('response');

    if (games && tippers) {
      const PieChart = Chart.Pie;
      const BarChart = Chart.Bar;

      const today = new Date();
      const todaysGames = games.sortBy(g => g.get('number')).filter(game => {

        const time = new Date(game.get('time'));
        return getTodayDate(time) === getTodayDate(today);
        // return getTodayDate(time) === '13/6';
      });

      if (todaysGames.size && !isBeforeDeadline()) {
        const todaysGamesData = [];

        const justTippers = tippers.filter(t => {
          return !t.get('admin');
        });

        todaysGames.map((game, i) => {
          const number = game.get('number');
          const gameData = {
            title: `${game.getIn(['home', 'name'])} - ${game.getIn(['away', 'name'])}`,
            time: game.get('time'),
            pie: [],
            bar: {
              labels: [],
              datasets: [{
                data: [],
                fillColor: '#FF6347',
              }],
            },
          };

          const homeWin = justTippers.filter(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return bong.getIn(['groupGames', number - 1, 0]) - bong.getIn(['groupGames', number - 1, 1]) > 0;
          });

          const drawWin = justTippers.filter(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return bong.getIn(['groupGames', number - 1, 0]) - bong.getIn(['groupGames', number - 1, 1]) == 0;
          });

          const awayWin = justTippers.filter(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return bong.getIn(['groupGames', number - 1, 0]) - bong.getIn(['groupGames', number - 1, 1]) < 0;
          });

          gameData.pie.push({
            label: `${game.getIn(['home', 'name'])}`,
            value: homeWin.size,
            color: '#2B98BD',
            borderWidth: 0,
          });
          gameData.pie.push({
            label: 'Kryss',
            value: drawWin.size,
            color: '#FDFDFD',
            borderWidth: 0,
          });
          gameData.pie.push({
            label: `${game.getIn(['away', 'name'])}`,
            value: awayWin.size,
            color: '#FF6347',
            borderWidth: 0,
          });

          justTippers.sortBy(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return bong.getIn(['groupGames', number - 1, 1]);
          }).sortBy(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return bong.getIn(['groupGames', number - 1, 0]);
          }).groupBy(t => {
            const bong = Immutable.fromJS(JSON.parse(t.get('bong')));
            return `${bong.getIn(['groupGames', number - 1, 0])}-${bong.getIn(['groupGames', number - 1, 1])}`;
          }).map(g => {
            const bong = Immutable.fromJS(JSON.parse(g.first().get('bong')));
            const game = `${bong.getIn(['groupGames', number - 1, 0])}-${bong.getIn(['groupGames', number - 1, 1])}`;

            gameData.bar.labels.push(game);
            gameData.bar.datasets[0].data.push(g.size);
          });
          todaysGamesData.push(gameData);
        });

        const options = {
          width: 500,
        };
        const charts = todaysGamesData.map(data => {
          let time = new Date(data.time);
          time = (time.getHours() - 2) + ':00';
          return (
            <article className={styles.game} key={data.title}>
              <div className={styles.gameHeading}>
                <p>{data.title}</p>
                <span>{time}</span>
              </div>
              <PieChart className={styles.chart} data={data.pie} width={320} options={options}/>
              <BarChart className={styles.chart} data={data.bar} width={320} options={options}/>
            </article>
          );
        });

        return (
          <section className={styles.groupGames}>
            <h1 className={styles.stageHeader}>Dagens matcher</h1>
            <div className={styles.groupList}>
              {charts}
            </div>
          </section>
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

TodaysGames.propTypes = {
  games: ImmutablePropTypes.map,
  tippers: ImmutablePropTypes.map,
  user: ImmutablePropTypes.map,
};

export default TodaysGames;
