import {fromJS} from 'immutable';

const worth = {
  groupGame: 1,
  groupGameFull: 4,
  groupOrder: 3,
  groupOrderOneOff: 1,
  playoff: {
    sixteen: 2,
    quarter: 4,
    semi: 8,
    final: 16,
  },
  playoffMultiplier: 6,
};

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

  tippers.map(tipper => {
    const bong = fromJS(JSON.parse(tipper.get('bong')));
    let points = 0;




    // Loop group games
    bong.get('groupGames').map((game, i) => {
      const tipperHome = game.get(0);
      const tipperAway = game.get(1);
      const tipperSymbol = calculateSymbol(tipperHome, tipperAway);

      const answerHome = answer.getIn(['groupGames', i, 0]);
      const answerAway = answer.getIn(['groupGames', i, 1]);
      const answerSymbol = calculateSymbol(answerHome, answerAway);

      if (tipperHome === '' || tipperAway === '' || answerHome === '' || answerAway === '') {
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
    actions.updateTipperPoints(tipper.set('score', newPoints))
  });

  return true;
};

export default updatePoints;
