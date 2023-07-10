const HASHTAGS_MAX_LENGTH = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const imageHashtags = uploadForm.querySelector('.text__hashtags');
const imageDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm);
let formStatus = '';
let notificationNumber = 0;

const closeEditImageForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  document.removeEventListener('keydown', onDocumentKeyDown);
  closeFormButton.removeEventListener('click', closeEditImageForm);
};

const openEditImageForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  closeFormButton.addEventListener('click', closeEditImageForm);
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape' && evt.target !== imageHashtags && evt.target !== imageDescription) {
    closeEditImageForm();
  }
}

const validateDescription = (decription) => decription.length <= DESCRIPTION_MAX_LENGTH;

const getHashtagArray = (hashtags) => hashtags.split(' ');

const validateHashtagsByPattern = (hashtags) => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return (hashtags.length === 0) || getHashtagArray(hashtags).every((hashtag) => hashtagPattern.test(hashtag));
};

const validateHashtagsLength = (hashtags) => getHashtagArray(hashtags).length <= HASHTAGS_MAX_LENGTH;

const validateHashtagsUniqueness = (hashtags) => {
  hashtags = getHashtagArray(hashtags);
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(imageHashtags, validateHashtagsByPattern, 'введён невалидный хэш-тег');
pristine.addValidator(imageHashtags, validateHashtagsLength, 'превышено количество хэш-тегов');
pristine.addValidator(imageHashtags, validateHashtagsUniqueness, 'хэш-теги повторяются');

pristine.addValidator(imageDescription, validateDescription, 'комментарий не длинее 140 символов');

const onNotificationKeydown = (evt) => {
  removeNotification();
  evt.stopPropagation();
};

const onNotificationOverlayClick = (evt) => {
  if (evt.target.classList.contains(formStatus)) {
    removeNotification();
  }
};

function removeNotification () {
  const notifications = document.querySelectorAll(`.${formStatus}`);
  notifications[notificationNumber - 1].remove();
  notificationNumber--;

  if (!notificationNumber) {
    document.removeEventListener('keydown', onNotificationKeydown, true);
    formStatus = '';
  }
}

const createNotification = (message = '') => {
  const notificationTemplate = document.querySelector(`#${formStatus}`).content.querySelector(`.${formStatus}`);
  const notification = notificationTemplate.cloneNode(true);
  if (message) {
    notification.querySelector(`.${formStatus}__title`).textContent = message;
  }
  notification.querySelector(`.${formStatus}__button`).addEventListener('click', removeNotification);
  notification.addEventListener('click', onNotificationOverlayClick);
  return notification;
};

const showNotification = (message = '') => {
  document.body.append(createNotification(message));
  document.addEventListener('keydown', onNotificationKeydown, true);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    formStatus = 'success';
    showNotification();
    closeEditImageForm();
    notificationNumber++;
    return;
  }

  formStatus = 'error';
  const errors = pristine.getErrors().map((item) => item.errors).flat();
  errors.forEach((message) => showNotification(message));
  notificationNumber = errors.length;
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', openEditImageForm);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {uploadPhoto};
