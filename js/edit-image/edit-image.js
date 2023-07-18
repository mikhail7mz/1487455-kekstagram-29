import { resetScaleValue, addScaleEditor } from './scale-editor.js';
import { initEffects } from './effects-editor.js';
import { pristineReset, pristineValidate, pristineInit } from './validate-image-editor.js';
import { sendData } from '../data.js';
import { showNotification } from '../notifications.js';

const SEND_DATA_URL = 'https://29.javascript.pages.academy/kekstagram/';
const NOTIFICATION_STATUS = {
  success: 'success',
  error: 'error'
};
const SUBMIT_BUTTON_TEXT = {
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
  submitButton.textContent = SUBMIT_BUTTON_TEXT[state.toString().toUpperCase()];
};

const onEffectsListChange = (event) => initEffects(event.target.value);

const closeEditImageForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormButton.removeEventListener('click', closeEditImageForm);
  imageEditorForm.reset();
  pristineReset();
  resetScaleValue();
  setButtonState();
  initEffects(currentEffectValue);
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

const onSendDataSuccess = () => {
  showNotification(NOTIFICATION_STATUS.success);
  closeEditImageForm();
};

const onSendDataError = () => {
  showNotification(NOTIFICATION_STATUS.error);
  setButtonState();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristineValidate()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataError, new FormData(evt.target));
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
