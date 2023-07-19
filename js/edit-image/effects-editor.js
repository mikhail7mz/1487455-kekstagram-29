const EFFECTS = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
  default: {
    min: 0,
    max: 1,
    step: 1,
  }
};

const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectSaturation = document.querySelector('.effect-level__value');

const setContainerState = (value) => {
  if (value === 'none' || !value) {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    return;
  }
  sliderContainer.classList.remove('hidden');
};

const createSlider = (effectsName) => {
  const {min, max, step, name, unit} = EFFECTS[effectsName] || EFFECTS.default;
  noUiSlider.create(slider, {
    range: {
      min,
      max
    },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value, 10)
    }
  });
  slider.noUiSlider.on('update', () => {
    const saturation = slider.noUiSlider.get();
    imagePreview.style.filter = `${name}(${saturation}${unit})`;
    effectSaturation.value = saturation;
  });
};

const initEffects = (effectsName) => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  setContainerState(effectsName);
  createSlider(effectsName);
};

export {initEffects};
