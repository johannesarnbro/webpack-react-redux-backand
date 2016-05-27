export const getUserName = (user) => {

  if (!user || !user.get) return false;

  let name = `${user.get('firstName')} `;
  name += (user.get('nickName')) ? `"${user.get('nickName')}" ` : '';
  name += `${user.get('lastName')}`;

  return name;
};
