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

const imageEditorForm = document.querySelector('.img-upload__form');
const imagePreview = imageEditorForm.querySelector('.img-upload__preview');
const effectsList = imageEditorForm.querySelector('.effects__list');
const sliderContainer = imageEditorForm.querySelector('.img-upload__effect-level');
const slider = imageEditorForm.querySelector('.effect-level__slider');
const effectSaturation = imageEditorForm.querySelector('.effect-level__value');

const hideEffectsSlider = () => {
  sliderContainer.classList.add('hidden');
};

const removeEffects = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  hideEffectsSlider();
  imagePreview.style.filter = 'none';
};

const addEffectsEditor = () => {
  effectsList.addEventListener('change', (evt) => {
    removeEffects();
    if (evt.target.value === 'none') {
      return;
    }

    const effect = EFFECTS[evt.target.value];

    noUiSlider.create(slider, {
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

    slider.noUiSlider.on('update', () => {
      const saturation = slider.noUiSlider.get();
      imagePreview.style.filter = effect.createFilterValue(saturation);
      effectSaturation.value = saturation;
    });

    sliderContainer.classList.remove('hidden');
  });
};

export {addEffectsEditor, removeEffects, hideEffectsSlider};
