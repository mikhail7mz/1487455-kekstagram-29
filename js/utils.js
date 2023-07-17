const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomId = (min, max) => {
  const previusValues = [];

  return () => {
    if (previusValues.length >= (max - min + 1)) {
      return -1;
    }

    let currentValue = getRandomInteger(min, max);

    while (previusValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previusValues.push(currentValue);

    return currentValue;
  };
};

const showNotification = (status, message = '') => {
  const template = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const notification = template.cloneNode(true);
  if (message) {
    notification.querySelector('[class$="__title"]').textContent = message;
  }
  notification.querySelector('[class$="__button"]').addEventListener('click', () => notification.remove());
  document.body.append(notification);
};

export {getRandomInteger, getRandomArrayElement, getRandomId, showNotification};
