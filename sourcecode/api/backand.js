import config from 'webpack-config-loader!conf';
import XMLHttpRequestPromise from 'xhr-promise';
import * as Bu from 'utils/BACKANDuser';

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

const shouldGetFromCache = (cache) => {
  const today = new Date().getTime();
  const cacheDate = cache.timestamp;
  return today - cacheDate >= config.cacheTime;
};

const backand = {
  get: (endpoint) => {
    const user = Bu.getUser();
    const js = getCache(endpoint);

    if (js && !shouldGetFromCache(js)) {
      return new Promise((resolve) => {
        const data = js.data;
        resolve(data);
      });
    } else {
      const url = config.apiEndpoint + endpoint;
      const xhrPromise = new XMLHttpRequestPromise();

      const headers = {};
      if (user) {
        headers.Authorization = `${user.token_type} ${user.access_token}`;
        headers.Appname = config.appName;
      } else {
        headers.AnonymousToken = config.anonymousToken;
      }

      return xhrPromise.send({
        method: 'GET',
        url: url,
        headers: headers,
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
  login: (endpoint, formData) => {
    const url = config.apiEndpoint + endpoint;
    const xhrPromise = new XMLHttpRequestPromise();

    return xhrPromise.send({
      method: 'POST',
      url: url,
      data: formData,
    })
    .then((payload) => {
      return payload.responseText;
    })
    .catch(() => {
      throw new Error('ERROR');
    });
  },
  register: (endpoint, formData) => {
    const url = config.apiEndpoint + endpoint;
    const xhrPromise = new XMLHttpRequestPromise();

    return xhrPromise.send({
      method: 'POST',
      url: url,
      data: JSON.stringify(formData),
      headers: {
        SignUpToken: config.signUpToken,
      },
    })
    .then((payload) => {
      return payload.responseText;
    })
    .catch(() => {
      throw new Error('ERROR');
    });
  },
  updateBong: (endpoint, bong) => {
    const user = Bu.getUser();
    const userId = user.userId;

    const url = config.apiEndpoint + endpoint + `/${userId}?returnObject=true`;
    const xhrPromise = new XMLHttpRequestPromise();

    const headers = {};

    if (user) {
      headers.Authorization = `${user.token_type} ${user.access_token}`;
      headers.Appname = config.appName;
    } else {
      headers.AnonymousToken = config.anonymousToken;
    }

    const data = JSON.stringify({
      bong: JSON.stringify(bong),
    });

    return xhrPromise.send({
      method: 'PUT',
      url: url,
      headers: headers,
      data: data,
    })
    .then((payload) => {
      return payload.responseText;
    })
    .catch(() => {
      throw new Error('ERROR');
    });
  },
};

export default backand;
