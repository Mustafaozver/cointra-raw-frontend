import Config from '../config/Config';
import storageManager from '../storage/storageManager';

const baseUrl = Config.baseApiUrl;

export const handleResponse = async (res) => {
  let json;
  try {
    json = await res.json();
  } catch (err) {
    if (err.status) {
      throw err;
    }

    const error = new Error('invalid json');
    error.status = res.status;
    throw error;
  }

  if (res.status >= 200 && res.status < 300) {
    return json;
  }

  const error = new Error(json.err || 'UNKNOWN');
  error.status = res.status;
  error.errorCode = json.err || 'UNKNOWN';
  throw error;
};

export const postFiles = (path, files) => {
  const data = new FormData();

  Object.keys(files).forEach((fileIndex) => {
    data.append(fileIndex, files[fileIndex]);
  });

  return fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      mode: '*cors',
      Authorization: storageManager.getBearerToken(),
    },
    body: data,
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }

    const error = new Error(res.statusText);
    error.status = res.status;
    throw error;
  });
};

export const post = (path, params) => fetch(baseUrl + path, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
    Authorization: storageManager.getBearerToken(),
  },
  body: JSON.stringify(params),
}).then((res) => handleResponse(res));

export const put = (path, params) => fetch(baseUrl + path, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
    Authorization: storageManager.getBearerToken(),
  },
  body: JSON.stringify(params),
}).then((res) => handleResponse(res));

export const patch = (path, params) => fetch(baseUrl + path, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
    Authorization: storageManager.getBearerToken(),
  },
  body: JSON.stringify(params),
}).then((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }

  const error = new Error(res.statusText);
  error.status = res.status;
  throw error;
});

export const get = (path, params) => {
  let queryString = '';
  if (params) {
    queryString = `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`;
  }

  return fetch(baseUrl + path + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: '*cors',
      Authorization: storageManager.getBearerToken(),
    },
  }).then((res) => handleResponse(res));
};

export const download = (path, params) => {
  let queryString = '';
  if (params) {
    queryString = `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`;
  }

  return fetch(baseUrl + path + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: '*cors',
      Authorization: storageManager.getBearerToken(),
    },
  }).then((res) => res.blob()
  ).then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });
};

export const deleteRequest = (path) => fetch(baseUrl + path, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    mode: '*cors',
    Authorization: storageManager.getBearerToken(),
  },
}).then((res) => res.json());
