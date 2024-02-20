import {resetScaleValue, addScaleEditor} from './scale-editor.js';
import {initEffects} from './effects-editor.js';
import {pristineReset, pristineValidate, pristineInit} from './validate-image-editor.js';
import {sendData} from '../utils/data.js';
import {showNotification} from '../utils/notifications.js';
import {isEscape} from '../utils/utils.js';

const SEND_DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/';

const NOTIFICATION_SUCCESS_STATUS = 'success';
const NOTIFICATION_SUCCESS_MESSAGE = 'Изображение успешно загружено';
const NOTIFICATION_SUCCESS_BUTTON_TEXT = 'Круто!';

const NOTIFICATION_ERROR_STATUS = 'error';
const NOTIFICATION_ERROR_MESSAGE = 'Ошибка загрузки файла';
const NOTIFICATION_ERROR_BUTTON_TEXT = 'Попробовать ещё раз';

const NOTIFICATION_FILE_INVALID_STATUS = 'error';
const NOTIFICATION_FILE_INVALID_MESSAGE = 'Некорректный формат файла';
const NOTIFICATION_FILE_INVALID_BUTTON_TEXT = 'Закрыть';

const SUBMIT_BUTTON_TEXT_DEFAULT = 'Опубликовать';
const SUBMIT_BUTTON_TEXT_SENDING = 'Опубликовывается...';

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
  submitButton.textContent = state ? SUBMIT_BUTTON_TEXT_DEFAULT : SUBMIT_BUTTON_TEXT_SENDING;
};

const onEffectsListChange = (event) => initEffects(event.target.value);

const onCloseFormButtonClick = (event) => {
  event.preventDefault();
  closeEditImageForm();
};

const onDocumentKeydown = (event) => {
  if (isEscape(event) && !event.target.closest('.img-upload__field-wrapper') && !document.querySelector('.error')) {
    closeEditImageForm();
  }
};

const openEditImageForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
};

/*
  Функции onDocumentKeydown и closeEditImageForm ссылаются друг на друга.
  Во избежании ошибок линтера closeEditImageForm написана декларативным способом.
*/
function closeEditImageForm () {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
  imageEditorForm.reset();
  pristineReset();
  resetScaleValue();
  setButtonState();
  initEffects(currentEffectValue);
}

const updateImage = ({target}) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const isFileValid = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isFileValid) {
    showNotification(NOTIFICATION_FILE_INVALID_STATUS, NOTIFICATION_FILE_INVALID_MESSAGE, NOTIFICATION_FILE_INVALID_BUTTON_TEXT);
    return;
  }

  const fileUrl = URL.createObjectURL(file);
  imagePreview.src = fileUrl;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${fileUrl}")`;
  });
  openEditImageForm();
};

const onImageFieldChange = (event) => updateImage(event);

const onSendDataSuccess = () => {
  showNotification(NOTIFICATION_SUCCESS_STATUS, NOTIFICATION_SUCCESS_MESSAGE, NOTIFICATION_SUCCESS_BUTTON_TEXT);
  closeEditImageForm();
};

const onSendDataError = () => {
  showNotification(NOTIFICATION_ERROR_STATUS, NOTIFICATION_ERROR_MESSAGE, NOTIFICATION_ERROR_BUTTON_TEXT);
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
