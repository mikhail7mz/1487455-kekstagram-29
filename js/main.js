const PHOTOS_QUANTITY = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomId (min, max) {
  const previusValues = [];

  return function () {
    if (previusValues.length >= (max - min + 1)) {
      return -1;
    }

    let currentValue = getRandomInteger(min, max);

    while (previusValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previusValues.push(currentValue);

    return currentValue;
  };
}

const getPhotoId = getRandomId(1, PHOTOS_QUANTITY);
const getCommentId = getRandomId(1, PHOTOS_QUANTITY * COMMENTS_MAX);

function getComment () {
  const names = [
    'Артём',
    'Борис',
    'Рудольф',
    'Кекс',
    'Семён',
    'Пётр'
  ];
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages[getRandomInteger(0, messages.length - 1)],
    name: names[getRandomInteger(0, names.length - 1)],
  };
}

function createPhoto () {
  const id = getPhotoId();
  const commentsQuantity = getRandomInteger(0, COMMENTS_MAX);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from({length: commentsQuantity}, () => getComment()),
  };
}

const photos = Array.from({length: PHOTOS_QUANTITY}, () => createPhoto());

console.log(photos);
