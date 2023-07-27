import { renderPictures } from './render-pictures.js';
import { debounce } from '../utils/utils.js';

const RANDOM_PICTURES_NUMBER = 10;
const RENDER_DELAY = 500;
const FILTER_RANDOM_ID = 'filter-random';
const FILTER_DISCUSSED_ID = 'filter-discussed';

const filtersGroup = document.querySelector('.img-filters');
const filtersForm = filtersGroup.querySelector('.img-filters__form');

const removePictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const getFilteredData = (data, filterId) => {
  switch (filterId) {
    case FILTER_RANDOM_ID:
      return data.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PICTURES_NUMBER);
    case FILTER_DISCUSSED_ID:
      return data.slice().sort((a,b) => b.comments.length - a.comments.length);
    default :
      return data;
  }
};

const onFiltersFormClick = (event, data) => {
  event.preventDefault();
  const {target} = event;
  if (!target.closest('.img-filters__button') || target.closest('.img-filters__button--active')) {
    return;
  }
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
  removePictures();
  renderPictures(getFilteredData(data, target.id));
};

const initFilters = (data) => {
  filtersGroup.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce((event) => onFiltersFormClick(event, data), RENDER_DELAY));
};

export {initFilters};
