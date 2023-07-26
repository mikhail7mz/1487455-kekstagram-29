import { resetScaleValue, addScaleEditor } from './scale-editor.js';
import { initEffects } from './effects-editor.js';
import { pristineReset, pristineValidate, pristineInit } from './validate-image-editor.js';
import { sendData } from '../utils/data.js';
import { showNotification } from '../utils/notifications.js';

const SEND_DATA_URL = 'https://29.javascript.pages.academy/kekstagram/';
const NOTIFICATION_SETTINGS = {
  success: {
    status: 'success',
    message: 'Изображение успешно загружено',
    buttonText: 'Круто!'
  },
  error: {
    status: 'error',
    message: 'Ошибка загрузки файла',
    buttonText: 'Попробовать ещё раз'
  },
  fileInvalid: {
    status: 'error',
    message: 'Некорректный формат файла',
    buttonText: 'Закрыть'
  }
};

const SUBMIT_BUTTON_TEXT = {
  TRUE: 'Опубликовать',
  FALSE: 'Опубликовывается...'
};

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const imageEditorForm = document.querySelector('.img-upload__form');
const imageField = imageEditorForm.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
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
  document.removeEventListener('keydown', onDocumentKeydown);
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
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButton.addEventListener('click', closeEditImageForm);
};

const updateImage = ({target}) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const isFileValid = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isFileValid) {
    const {status, message, buttonText} = NOTIFICATION_SETTINGS.fileInvalid;
    showNotification(status, message, buttonText);
    return;
  }

  const fileUrl = URL.createObjectURL(file);
  imagePreview.src = fileUrl;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${fileUrl}")`;
  });
  openEditImageForm();
};

const onImageFieldChange = (event) => {
  updateImage(event);
};

function onDocumentKeydown (event) {
  if(event.key === 'Escape' && !event.target.closest('.img-upload__field-wrapper') && !document.querySelector('.error')) {
    closeEditImageForm();
  }
}

const onSendDataSuccess = () => {
  const {status, message, buttonText} = NOTIFICATION_SETTINGS.success;
  showNotification(status, message, buttonText);
  closeEditImageForm();
};

const onSendDataError = () => {
  const {status, message, buttonText} = NOTIFICATION_SETTINGS.error;
  showNotification(status, message, buttonText);
  setButtonState();
};

const onUploadFormSubmit = (event) => {
  event.preventDefault();
  if (pristineValidate()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataError, new FormData(event.target));
    setButtonState(false);
  }
};

const initImageEditor = () => {
  pristineInit();
  addScaleEditor();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', onEffectsListChange);
  imageField.addEventListener('change', onImageFieldChange);
  imageEditorForm.addEventListener('submit', onUploadFormSubmit);
};

export {initImageEditor};
