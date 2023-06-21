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

export {getRandomInteger, getRandomArrayElement, getRandomId};
