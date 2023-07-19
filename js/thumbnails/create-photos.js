import {getRandomInteger, getRandomArrayElement, getRandomId} from '../utils/utils.js';

const PHOTOS_QUANTITY = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;
const NAMES = [
  'Артём',
  'Борис',
  'Рудольф',
  'Кекс',
  'Семён',
  'Пётр'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createMessage = () => {
  const messages = Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));
  return [...new Set(messages)].join(' ');
};

const createCommentById = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhotoById = (id, createComment) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, () => createComment()),
});

const createPhotos = () => {
  const createCommentId = getRandomId(1, PHOTOS_QUANTITY * COMMENTS_MAX);
  const createComment = () => createCommentById(createCommentId());
  const createPhotoId = getRandomId(1, PHOTOS_QUANTITY);
  const createPhoto = () => createPhotoById(createPhotoId(), createComment);
  return Array.from({length: PHOTOS_QUANTITY}, createPhoto);
};

export {createPhotos};
