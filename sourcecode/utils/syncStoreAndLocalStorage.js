import Immutable from 'immutable';

export const copyStateToLocalStorage = (state, response) => {
  localStorage.setItem(state, JSON.stringify(response));
};

export const populateStoreFromLocalStorage = (actions) => {
  const states = ['Bong', 'Games', 'Locations', 'Teams', 'Tippers'];

  states.map(state => {
    if (localStorage.getItem(state.toLowerCase())) {
      const action = `populate${state}FromLocalStorage`;
      actions[action](
        Immutable.fromJS(JSON.parse(localStorage.getItem(state.toLowerCase())))
      );
    }
  });
};
