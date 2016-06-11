import {fromJS} from 'immutable';
import {worth} from './worth';

const calculateSymbol = (home, away) => {
  const diff = home - away;
  let symbol = '';

  if (diff < 0) {
    symbol = '[1]'
  } else if (diff > 0) {
    symbol = '[2]'
  } else if (diff == 0) {
    symbol = '[X]'
  }

  return symbol;
};

const updatePoints = (tippers, answer, actions) => {

  tippers = tippers.filter(tipper => {
    return tipper.get('admin') === false;
  });

  tippers = tippers.map(tipper => {
    const bong = fromJS(JSON.parse(tipper.get('bong')));
    let points = 0;

    // Loop group games
    bong.get('groupGames').map((game, i) => {
      const tipperHome = parseInt(game.get(0)).toString();
      const tipperAway = parseInt(game.get(1)).toString();
      const tipperSymbol = calculateSymbol(tipperHome, tipperAway);

      const answerHome = parseInt(answer.getIn(['groupGames', i, 0])).toString();
      const answerAway = parseInt(answer.getIn(['groupGames', i, 1])).toString();
      const answerSymbol = calculateSymbol(answerHome, answerAway);

      if (tipperHome === 'NaN' || tipperAway === 'NaN' || answerHome === 'NaN' || answerAway === 'NaN') {
        return false;
      }

      //If game is symbol-wise right, add points
      if (tipperSymbol === answerSymbol) {
        points += worth.groupGame;
      }

      //If game is exactly right, add points
      if (tipperHome === answerHome && tipperAway === answerAway) {
        points += worth.groupGameFull;
      }
    });




    // Loop group order
    bong.get('groupOrder').map((group, i) => {
      const checked = document.querySelector(`#checkbox-${i}`).checked;
      if (!checked) return false;

      //Loop teams in group
      group.map((team, place) => {
        if (team === answer.getIn(['groupOrder', i, place])) {
          // If team is in right place
          points += worth.groupOrder;
        } else if (team === answer.getIn(['groupOrder', i, place-1])) {
          // If team is one off
          points += worth.groupOrderOneOff;
        } else if (team === answer.getIn(['groupOrder', i, place+1])) {
          // If team is one off
          points += worth.groupOrderOneOff;
        }
      });
    });

    // Loop playoff stages
    bong.get('playoff').map((teams, stage) => {

      teams.map(team => {
        //Check if team is through to this stage of the playoffs
        const teamThoughToStage = answer.getIn(['playoff', stage]).find(t => t === team);

        if (teamThoughToStage) {

          //Get number of tippers with this team through to this stage of the playoffs
          const otherTippersWithTeamThough = tippers.filter(t => {
            return fromJS(JSON.parse(t.get('bong'))).getIn(['playoff', stage]).find(t => t === team);
          }).size - 1;

          const totalNumberOfOtherTippers = tippers.size - 1;

          //Add points for having team through to this stage
          points += worth.playoff[stage];
          //Add extra points base on how many tippers have the team through
          points += ((1 - (otherTippersWithTeamThough / totalNumberOfOtherTippers)) * worth.playoffMultiplier);

        } else {
          return false;
        }
      });
    });


    const newPoints = `${tipper.get('score')},${points}`;

    //Update this user's points
    // return tipper.set('score', ',0');
    return tipper.set('score', newPoints);
  }).sortBy(t => {
    return parseInt(t.get('score').split(',').reverse()[0]);
  }).reverse().reduce((memo, t, i) => {
    if (memo.last()) {
      const prevScore = memo.last().get('score').split(',').reverse()[0];
      const score = t.get('score').split(',').reverse()[0];
      const prevPlace = memo.last().get('place').split(',').reverse()[0];

      if (prevScore === score) {
        t = t.set('place', `${t.get('place')},${prevPlace}`);
      } else {
        t = t.set('place', `${t.get('place')},${i+1}`);
      }
    } else {
      t = t.set('place', `${t.get('place')},${i+1}`);
    }
    // t = t.set('place', ',1');
    return memo = memo.push(t);
  }, fromJS([])).map((t, i) => {
    actions.updateTipperPoints(t);
  });

  return true;
};

export default updatePoints;
