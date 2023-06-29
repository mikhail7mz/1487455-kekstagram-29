import { createPhotos } from './create-photos.js';

const photos = createPhotos();
const pictures = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

photos.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(picture);
});

pictures.appendChild(picturesFragment);
