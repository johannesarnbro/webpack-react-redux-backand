import Immutable from 'immutable';

export const copyStateToLocalStorage = (state, response) => {
  localStorage.setItem(state, JSON.stringify(response));
};

export const populateStoreFromLocalStorage = (actions) => {
  const states = ['Games', 'Locations', 'Teams', 'Tippers'];

  states.map(state => {
    if (localStorage.getItem(state)) {
      actions[`populate${state}FromLocalStorage`](
        Immutable.fromJS(JSON.parse(localStorage.getItem(state.toLowerCase())))
      );
    }
  });
};
