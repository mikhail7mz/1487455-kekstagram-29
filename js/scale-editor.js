const SCALE_MIN = 25;
const SCALE_STEP = 25;
const SCALE_MAX = 100;

const imageEditorForm = document.querySelector('.img-upload__form');
const buttonLess = imageEditorForm.querySelector('.scale__control--smaller');
const valueOutputField = imageEditorForm.querySelector('.scale__control--value');
const buttonMore = imageEditorForm.querySelector('.scale__control--bigger');
const imagePreview = imageEditorForm.querySelector('.img-upload__preview');
let scaleValue = SCALE_MAX;

const setScaleValue = () => {
  valueOutputField.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

const resetScaleValue = () => {
  scaleValue = SCALE_MAX;
  setScaleValue();
};

const addScaleEditor = () => {
  buttonLess.addEventListener('click', () => {
    scaleValue = Math.max(scaleValue - SCALE_STEP, SCALE_MIN);
    setScaleValue();
  });

  buttonMore.addEventListener('click', () => {
    scaleValue = Math.min(scaleValue + SCALE_STEP, SCALE_MAX);
    setScaleValue();
  });
};

export {resetScaleValue, addScaleEditor};
