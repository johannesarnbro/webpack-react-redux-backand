export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('BACKANDuser'));
};

export const setUser = (data) => {
  window.localStorage.setItem('BACKANDuser', JSON.stringify(data));
};

export const removeUser = () => {
  window.localStorage.removeItem('BACKANDuser')
};
