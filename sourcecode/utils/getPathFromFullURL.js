import config from 'webpack-config-loader!conf';

function getPathFromFullUrl(url) {
  const hostname = config.hostname || 'http://' + window.location.host;
  url = url || '';
  return url
    .replace(hostname, '')
    .replace(/\/$/, '');
}

export default getPathFromFullUrl;
