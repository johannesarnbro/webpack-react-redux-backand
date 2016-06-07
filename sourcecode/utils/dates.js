import config from 'webpack-config-loader!conf';

export const isBeforeDeadline = () => {
  const now = new Date().getTime();
  const deadline = new Date(config.deadline).getTime();

  return deadline > now;
};

export const getTodayDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}`;
};
