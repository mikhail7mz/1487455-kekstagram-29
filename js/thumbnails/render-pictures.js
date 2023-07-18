import { renderBigPicture } from './big-picture.js';
import { getData } from '../data.js';
import { showNotification } from '../notifications.js';

const GET_DATA_SETTINGS = {
  url: 'https://29.javascript.pages.academy/kekstagram/data',
  errorMessage: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  errorButtonText: 'Закрыть'
};

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = (photo) => {
  const {url, description, likes, comments} = photo;
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.addEventListener('click', () => renderBigPicture(photo));
  return picture;
};

const onGetDataSuccess = (photos) => {
  const picturesFragment = document.createDocumentFragment();
  photos.forEach((photo) => picturesFragment.appendChild(createPicture(photo)));
  pictures.appendChild(picturesFragment);
};

const onGetDataError = () => {
  const {errorMessage, errorButtonText} = GET_DATA_SETTINGS;
  showNotification('error', errorMessage, errorButtonText);
};

const renderPictures = () => getData(GET_DATA_SETTINGS.url, onGetDataSuccess, onGetDataError);

export {renderPictures};
