const getSlugFromPath = path => {
  path = path.replace(/\/$/, '');
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export default getSlugFromPath;
