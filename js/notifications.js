let notification = {};

const onButtonCloseClick = () => removeNotifictation();

const onDocumentClick = (evt) => {
  if(evt.target === notification) {
    removeNotifictation();
  }
};

const onDocumentKeyDown = (evt) => {
  if(evt.key === 'Escape') {
    removeNotifictation();
  }
};

const createNotification = (status, message, buttonText) => {
  const template = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  notification = template.cloneNode(true);
  const closeButton = notification.querySelector('[class$="__button"]');
  if (message) {
    notification.querySelector('[class$="__title"]').textContent = message;
  }
  if (buttonText) {
    closeButton.textContent = buttonText;
  }
  closeButton.addEventListener('click', onButtonCloseClick);
  document.body.append(notification);
};

function removeNotifictation () {
  notification.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);
}

const showNotification = (status, message = '', buttonText = '') => {
  createNotification(status, message, buttonText);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
};

export {showNotification};
