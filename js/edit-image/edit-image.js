import { resetScaleValue, addScaleEditor } from './scale-editor.js';
import { initEffects, updateEffects } from './effects-editor.js';
import { pristineReset, pristineValidate, pristineInit } from './validate-image-editor.js';
import { sendData } from '../data.js';
import { showNotification } from '../utils.js';

const buttonText = {
  TRUE: 'Опубликовать',
  FALSE: 'Опубликовывается...'
};

const imageEditorForm = document.querySelector('.img-upload__form');
const imageField = imageEditorForm.querySelector('.img-upload__input');
const overlay = imageEditorForm.querySelector('.img-upload__overlay');
const closeFormButton = imageEditorForm.querySelector('.img-upload__cancel');
const effectsList = imageEditorForm.querySelector('.effects__list');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = imageEditorForm.querySelector('.img-upload__submit');

const setButtonState = (state = true) => {
  submitButton.disabled = !state;
  submitButton.textContent = buttonText[state.toString().toUpperCase()];
};

const onEffectsListChange = (event) => updateEffects(event.target.value);

const closeEditImageForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormButton.removeEventListener('click', closeEditImageForm);
  imageEditorForm.reset();
  pristineReset();
  resetScaleValue();
  setButtonState();
  updateEffects(currentEffectValue);
};

const openEditImageForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormButton.addEventListener('click', closeEditImageForm);
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape' && !evt.target.closest('.img-upload__field-wrapper')) {
    closeEditImageForm();
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristineValidate()) {
    sendData(new FormData(evt.target))
      .then(() => {
        showNotification('success');
        closeEditImageForm();
      })
      .catch(() => {
        showNotification('error');
        setButtonState();
      });
    setButtonState(false);
  }
};

const initImageEditor = () => {
  pristineInit();
  addScaleEditor();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', onEffectsListChange);
  imageField.addEventListener('change', openEditImageForm);
  imageEditorForm.addEventListener('submit', onUploadFormSubmit);
};

export {initImageEditor};
