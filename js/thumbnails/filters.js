import { renderPictures } from './render-pictures.js';
import { debounce } from '../utils/utils.js';

const RENDER_DELAY = 500;
const FilterType = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');


const removePictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const getFilteredData = (data, filterId) => {
  switch (filterId) {
    case FilterType.RANDOM:
      return data.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    case FilterType.DISCUSSED:
      return data.slice().sort((a,b) => b.comments.length - a.comments.length);
    default :
      return data;
  }
};

const onFiltersFormClick = (evt, data) => {
  const buttonActive = evt.target.closest('.img-filters__button');
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonActive.classList.add('img-filters__button--active');
  removePictures();
  renderPictures(getFilteredData(data, buttonActive.id));
};

const initFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce((evt) => onFiltersFormClick(evt, data), RENDER_DELAY));
};

export {initFilters};
