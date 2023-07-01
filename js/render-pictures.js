import { createPhotos } from './create-photos.js';

const photos = createPhotos();
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
  return picture;
};

const renderPictures = () => {
  const picturesFragment = document.createDocumentFragment();
  photos.forEach((photo) => picturesFragment.appendChild(createPicture(photo)));
  pictures.appendChild(picturesFragment);
};

export {renderPictures};
