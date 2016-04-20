import Immutable from 'immutable';

export const copyStateToLocalStorage = (state, response) => {
  localStorage.setItem(state, JSON.stringify(response));
};

export const removeStateFromLocalStorage = (state) => {
  localStorage.removeItem(state);
};

export const populateStoreFromLocalStorage = (actions) => {
  const states = ['Bong', 'Games', 'Locations', 'Teams', 'Tippers', 'User'];

  states.map(state => {
    if (localStorage.getItem(state.toLowerCase())) {
      const action = `populate${state}FromLocalStorage`;
      actions[action](
        Immutable.fromJS(JSON.parse(localStorage.getItem(state.toLowerCase())))
      );
    }
  });
};
