const SCALE_MIN = 25;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const DIVIDER = 100;

const buttonLess = document.querySelector('.scale__control--smaller');
const valueOutputField = document.querySelector('.scale__control--value');
const buttonMore = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
let scaleValue = SCALE_MAX;

const setScaleValue = () => {
  valueOutputField.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / DIVIDER})`;
};

const resetScaleValue = () => {
  scaleValue = SCALE_MAX;
  setScaleValue();
};

const onButtonLessClick = (event) => {
  event.preventDefault();
  if (scaleValue > SCALE_MIN) {
    scaleValue -= SCALE_STEP;
    setScaleValue();
  }
};

const onButtonMoreClick = (event) => {
  event.preventDefault();
  if (scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
    setScaleValue();
  }
};

const addScaleEditor = () => {
  buttonLess.addEventListener('click', onButtonLessClick);
  buttonMore.addEventListener('click', onButtonMoreClick);
};

export {resetScaleValue, addScaleEditor};
