import {renderBigPicture} from './big-picture.js';
import {getData} from '../utils/data.js';
import {showNotification} from '../utils/notifications.js';
import {initFilters} from './filters.js';

const GET_DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const GET_DATA_ERROR_STATUS = 'error';
const GET_DATA_ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const GET_DATA_ERROR_BUTTON_TEXT = 'Закрыть';

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

const renderPictures = (photos) => {
  const picturesFragment = document.createDocumentFragment();
  photos.forEach((photo) => picturesFragment.appendChild(createPicture(photo)));
  pictures.appendChild(picturesFragment);
};

const onGetDataSuccess = (photos) => {
  renderPictures(photos);
  initFilters(photos);
};

const onGetDataError = () => showNotification(GET_DATA_ERROR_STATUS, GET_DATA_ERROR_MESSAGE, GET_DATA_ERROR_BUTTON_TEXT);

const initPictures = () => getData(GET_DATA_URL, onGetDataSuccess, onGetDataError);

export {renderPictures, initPictures};
