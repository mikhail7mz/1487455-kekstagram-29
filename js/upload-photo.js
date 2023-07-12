import { resetScaleValue, addScaleEditor } from './scale-editor.js';
import { addEffectsEditor, removeEffects, hideEffectsSlider } from './effects-editor.js';
import { createValidator } from './validate-image-editor.js';

const imageEditorForm = document.querySelector('.img-upload__form');
const imageField = imageEditorForm.querySelector('.img-upload__input');
const overlay = imageEditorForm.querySelector('.img-upload__overlay');
const closeFormButton = imageEditorForm.querySelector('.img-upload__cancel');
const formValidator = createValidator();

const closeEditImageForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormButton.removeEventListener('click', closeEditImageForm);
  imageEditorForm.reset();
  formValidator.reset();
  removeEffects();
  resetScaleValue();
};

const openEditImageForm = () => {
  hideEffectsSlider();
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormButton.addEventListener('click', closeEditImageForm);
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape') {
    closeEditImageForm();
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (formValidator.validate()) {
    closeEditImageForm();
  }
};

const initImageEditor = () => {
  addScaleEditor();
  addEffectsEditor();
  imageField.addEventListener('change', openEditImageForm);
  imageEditorForm.addEventListener('submit', onUploadFormSubmit);
};

export {initImageEditor};
