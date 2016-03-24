import config from 'webpack-config-loader!conf';
import XMLHttpRequestPromise from 'xhr-promise';

const checkStatus = (response) => {
  if (response.status >= 200
    && response.status < 300
    && response.responseText.status !== 400
  ) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

const saveToLocalStorage = (timestamp, endpoint, data) => {
  try {
    localStorage.setItem(endpoint, JSON.stringify({
      timestamp: timestamp,
      data: data,
    }));
  } catch (error) {
    return false;
  }
};

const getCache = (endpoint) => {
  try {
    const cache = localStorage.getItem(endpoint);
    return JSON.parse(cache);
  } catch (error) {
    return false;
  }
};

const isLoggedIn = () => {
  try {
    return localStorage.getItem('loggedIn');
  } catch (error) {
    return false;
  }
};

const shouldGetFromCache = (cache) => {
  const today = new Date().getTime();
  const cacheDate = cache.timestamp;
  return today - cacheDate >= config.cacheTime;
};

const backand = {
  get: (endpoint) => {
    const loggedIn = isLoggedIn();
    const js = getCache(endpoint);

    if (js && !shouldGetFromCache(js) && loggedIn !== 'true') {
      return new Promise((resolve) => {
        const data = js.data;
        resolve(data);
      });
    } else {
      const url = config.apiEndpoint + endpoint;
      const xhrPromise = new XMLHttpRequestPromise();
      return xhrPromise.send({
        method: 'GET',
        url: url,
        headers: {
          AnonymousToken: '98c285fd-477f-46ad-ad5e-ff20ce91823f',
        },
      })
      .then(checkStatus)
      .then((payload) => {
        saveToLocalStorage(
          new Date().getTime(),
          endpoint,
          payload.responseText
        );
        return payload.responseText;
      })
      .catch(function (e) {
        throw new Error('error:');
      });
    }
  },
  post: (endpoint, data) => {

  },
};

export default backand;
