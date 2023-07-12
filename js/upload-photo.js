const HASHTAGS_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const SCALE_MIN = 25;
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const EFFECTS = {
  chrome: {
    createFilterValue: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    createFilterValue: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    createFilterValue: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    createFilterValue: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    createFilterValue: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    step: 0.1
  }
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const imageHashtags = uploadForm.querySelector('.text__hashtags');
const imageDescription = uploadForm.querySelector('.text__description');

const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
let scaleValue = parseInt(scaleControlValue.value, 10);

const effects = uploadForm.querySelector('.effects__list');
const effectSliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectSaturation = uploadForm.querySelector('.effect-level__value');

const removeEffects = () => {
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  effectSliderContainer.classList.add('hidden');
  imagePreview.style.filter = 'none';
};

effects.addEventListener('change', (evt) => {
  removeEffects();
  if (evt.target.value === 'none') {
    return;
  }

  const effect = EFFECTS[evt.target.value];

  noUiSlider.create(effectSlider, {
    range: {
      'min': effect.min,
      'max': effect.max
    },
    step: effect.step,
    start: effect.max,
    connect: 'lower',
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value, 10)
    }
  });

  effectSlider.noUiSlider.on('update', () => {
    const saturation = effectSlider.noUiSlider.get();
    imagePreview.style.filter = effect.createFilterValue(saturation);
    effectSaturation.value = saturation;
  });

  effectSliderContainer.classList.remove('hidden');
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const normalizeHashtags = (hashtags) => hashtags.trim().split(' ').filter((tag) => Boolean(tag));

const validateHashtagsByPattern = (hashtags) => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return (hashtags.length === 0) || normalizeHashtags(hashtags).every((hashtag) => hashtagPattern.test(hashtag));
};

const validateHashtagsByLength = (hashtags) => normalizeHashtags(hashtags).length <= HASHTAGS_MAX_LENGTH;

const validateHashtagsByUniqueness = (hashtags) => {
  hashtags = normalizeHashtags(hashtags);
  return hashtags.length === new Set(hashtags).size;
};

const validateDescription = (decription) => decription.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(imageHashtags, validateHashtagsByPattern, 'введён невалидный хэш-тег');
pristine.addValidator(imageHashtags, validateHashtagsByLength, 'превышено количество хэш-тегов');
pristine.addValidator(imageHashtags, validateHashtagsByUniqueness, 'хэш-теги повторяются');
pristine.addValidator(imageDescription, validateDescription, 'комментарий не длинее 140 символов');

const resetScaleValue = () => {
  scaleValue = SCALE_MAX;
};

const setScaleValue = () => {
  scaleControlValue.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  scaleValue = Math.max(scaleValue - SCALE_STEP, SCALE_MIN);
  setScaleValue();
});

scaleControlBigger.addEventListener('click', () => {
  scaleValue = Math.min(scaleValue + SCALE_STEP, SCALE_MAX);
  setScaleValue();
});

const closeEditImageForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  removeEffects();
  resetScaleValue();
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormButton.removeEventListener('click', closeEditImageForm);
};

const openEditImageForm = () => {
  setScaleValue();
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  effectSliderContainer.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormButton.addEventListener('click', closeEditImageForm);
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape' && evt.target !== imageHashtags && evt.target !== imageDescription) {
    closeEditImageForm();
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    closeEditImageForm();
  }
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', openEditImageForm);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {uploadPhoto};
