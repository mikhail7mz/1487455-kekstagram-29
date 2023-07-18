const DEFAULT_METHOD = 'POST';

const catchDefault = (error, onGetError) => {
  onGetError(error);
  throw new Error(error);
};

const getData = (url, onGetSuccess, onGetError) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => onGetSuccess(data))
    .catch((error) => catchDefault(error, onGetError));
};

const sendData = (url, onGetSuccess, onGetError, body, method = DEFAULT_METHOD) => {
  fetch(url, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onGetSuccess();
    })
    .catch((error) => catchDefault(error, onGetError));
};

export { getData, sendData };
