const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

const onButtonCloseClick = () => closeBigPicture();

const onDocumentKeyDown = (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
};

/*
  Функции обработчиков (onButtonCloseClick и onDocumentKeyDown) и closeBigPicture ссылаются друг на друга
  Из-за этого ругается линтер. Ошибка: function was used before it was defined
  Поэтому closeBigPicture написал декларативным способом а не стрелочным
*/
function closeBigPicture () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  buttonClose.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const renderComment = (data) => {
  const {avatar, message, name} = data;
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__text').textContent = message;
  const socialPicture = comment.querySelector('.social__picture');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  return comment;
};

const fillBigPicture = (data) => {
  const {url, description, likes, comments} = data;
  const commentsFragment = document.createDocumentFragment();
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  comments.forEach((comment) => commentsFragment.appendChild(renderComment(comment)));
  commentsList.replaceChildren(commentsFragment);
};

const renderBigPicture = (data) => {
  fillBigPicture(data);

  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onDocumentKeyDown);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

export {renderBigPicture};
