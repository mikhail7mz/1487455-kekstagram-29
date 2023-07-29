import {isEscape} from '../utils/utils.js';

const COMMENTS_NUMBER = 5;

const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let commentsData = [];
let showingComments = 0;

const onButtonCloseClick = (event) => {
  event.preventDefault();
  closeBigPicture();
};

const onDocumentKeydown = (event) => {
  event.preventDefault();
  if (isEscape(event)) {
    closeBigPicture();
  }
};

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__text').textContent = message;
  const socialPicture = comment.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  return comment;
};

const fillCommentCounter = () => {
  commentsCounter.innerHTML = `${showingComments} из <span class="comments-count">${commentsData.length}</span> комментариев`;
};

const setButtonState = () => {
  if (showingComments >= commentsData.length) {
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsLoader.classList.remove('hidden');
};

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const newComments = commentsData.slice(showingComments, showingComments + COMMENTS_NUMBER);
  showingComments = Math.min(showingComments + COMMENTS_NUMBER, commentsData.length);
  newComments.forEach((comment) => commentsFragment.append(createComment(comment)));
  commentsList.append(commentsFragment);
  fillCommentCounter();
  setButtonState();
};

const onCommentsLoaderClick = (event) => {
  event.preventDefault();
  renderComments();
};

/*
  Функции closeBigPicture и обработчики событий ссылаются друг на друга.
  Во избежании ошибок линтера closeBigPicture написана декларативным способом.
*/
function closeBigPicture () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  showingComments = 0;
}

const openBigPicture = () => {
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const fillBigPicture = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  commentsList.innerHTML = '';
  renderComments();
};

const renderBigPicture = (data) => {
  commentsData = data.comments;
  fillBigPicture(data);
  openBigPicture();
};

export {renderBigPicture};
