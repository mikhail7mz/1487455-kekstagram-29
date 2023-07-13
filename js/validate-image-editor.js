const HASHTAGS_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const imageEditorForm = document.querySelector('.img-upload__form');
const hashtagsField = imageEditorForm.querySelector('.text__hashtags');
const descriptionField = imageEditorForm.querySelector('.text__description');

const pristine = new Pristine(imageEditorForm, {
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

pristine.addValidator(hashtagsField, validateHashtagsByPattern, 'введён невалидный хэш-тег');
pristine.addValidator(hashtagsField, validateHashtagsByLength, 'превышено количество хэш-тегов');
pristine.addValidator(hashtagsField, validateHashtagsByUniqueness, 'хэш-теги повторяются');
pristine.addValidator(descriptionField, validateDescription, 'комментарий не длинее 140 символов');

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const createValidator = () => {
  hashtagsField.addEventListener('keydown', onInputKeydown);
  descriptionField.addEventListener('keydown', onInputKeydown);
  return pristine;
};

export {createValidator};
