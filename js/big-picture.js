const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsNumber = commentsCounter.childNodes[0];
const commentsMax = commentsCounter.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let commentsData = [];

/*
  Функции обработчиков (onButtonCloseClick и onDocumentKeyDown) и closeBigPicture ссылаются друг на друга
  Из-за этого ругается линтер. Ошибка: function was used before it was defined
  Поэтому часть функций написал декларативным способом а не стрелочным
*/

const onButtonCloseClick = () => closeBigPicture();

const onDocumentKeyDown = (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
};

const renderComment = (data) => {
  const {avatar, message, name} = data;
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__text').textContent = message;
  const socialPicture = comment.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  return comment;
};

const renderMoreComments = (comments, startIndex = 0) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0 + startIndex; i < comments.length && i < 5 + startIndex; i++) {
    commentsFragment.appendChild(renderComment(comments[i]));
  }
  return commentsFragment;
};

const changeCounter = (quantity) => {
  commentsNumber.textContent = commentsNumber.textContent.replace(/\d+/, quantity);
};

const onCommentsLoaderClick = () => {
  commentsList.appendChild(renderMoreComments(commentsData, parseInt(commentsNumber.textContent, 10)));
  changeCounter((commentsList.children.length <= commentsData.length ? commentsList.children.length : commentsData.length));
  if (commentsList.children.length >= commentsData.length) {
    commentsLoader.classList.add('hidden');
  }
};

function closeBigPicture () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  commentsLoader.commentsLoader('click', onCommentsLoaderClick);
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsLoader.classList.remove('hidden');
}

const fillBigPicture = (data) => {
  const {url, description, likes, comments} = data;
  commentsData = comments;
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.replaceChildren(renderMoreComments(comments));
  commentsMax.textContent = comments.length;
  changeCounter((comments.length < 5) ? comments.length : 5);
  if (comments.length <= 5) {
    commentsLoader.classList.add('hidden');
  }
};

const renderBigPicture = (data) => {
  fillBigPicture(data);

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeyDown);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export {renderBigPicture};
