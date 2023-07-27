const HASHTAGS_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const MESSAGE_INVALID_PATTERN = 'введён невалидный хэш-тег';
const MESSAGE_INVALID_LENGTH = 'превышено количество хэш-тегов';
const MESSAGE_INVALID_UNIQUENESS = 'хэш-теги повторяются';
const MESSAGE_INVALID_DESCRIPTION = 'комментарий не длинее 140 символов';
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const imageEditorForm = document.querySelector('.img-upload__form');
const hashtagsField = imageEditorForm.querySelector('.text__hashtags');
const descriptionField = imageEditorForm.querySelector('.text__description');

const pristine = new Pristine(imageEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

const createHashtags = (value) => value.trim().toLowerCase().split(' ').filter((tag) => tag);

const validateHashtagsByPattern = (value) => {
  if (!value.length) {
    return true;
  }
  return createHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));
};

const validateHashtagsByLength = (value) => createHashtags(value).length <= HASHTAGS_MAX_LENGTH;

const validateHashtagsByUniqueness = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateDescription = (description) => description.length <= DESCRIPTION_MAX_LENGTH;

const pristineInit = () => {
  pristine.addValidator(hashtagsField, validateHashtagsByPattern, MESSAGE_INVALID_PATTERN, 1, true);
  pristine.addValidator(hashtagsField, validateHashtagsByLength, MESSAGE_INVALID_LENGTH, 1, true);
  pristine.addValidator(hashtagsField, validateHashtagsByUniqueness, MESSAGE_INVALID_UNIQUENESS, 1, true);
  pristine.addValidator(descriptionField, validateDescription, MESSAGE_INVALID_DESCRIPTION, 1, true);
};

const pristineReset = () => pristine.reset();
const pristineValidate = () => pristine.validate();

export {pristineInit, pristineReset, pristineValidate};
