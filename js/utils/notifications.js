import {createElement} from './utils.js';

let notification = null;

const createNotificationTemplate = (status, message, buttonText) =>
  `<section class="${status}">
    <div class="${status}__inner">
      <h2 class="${status}__title">${message}</h2>
      ${buttonText ? `<button type="button" class="${status}__button">${buttonText}</button>` : ''}
    </div>
  </section>`;

const onButtonCloseClick = () => removeNotification();

const onNotificationClick = (event, status) => {
  if (!event.target.closest(`.${status}__inner`)) {
    removeNotification();
  }
};

const onDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    removeNotification();
  }
};

/*
  Функции removeNotification и onDocumentKeydown ссылаются друг на друга.
  Во избежании ошибок линтера removeNotification написана декларативным способом.
*/
function removeNotification () {
  notification.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showNotification = (status, message, buttonText) => {
  notification = createElement(createNotificationTemplate(status, message, buttonText));

  if (buttonText) {
    notification.querySelector('button').addEventListener('click', onButtonCloseClick);
  }

  notification.addEventListener('click', (event) => onNotificationClick(event, status));

  document.addEventListener('keydown', onDocumentKeydown);

  document.body.classList.add('modal-open');
  document.body.append(notification);
};

export {showNotification};
