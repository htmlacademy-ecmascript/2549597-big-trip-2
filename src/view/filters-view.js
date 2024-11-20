import AbstractView from '../framework/view/abstract-view.js';
import {convertFirstLetter} from '../utils/utils.js';

function createFilterItemTemplate(filter, currentFilterType) {
  return (`<div class="trip-filters__filter">
            <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${(currentFilterType === filter.type) ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter.type}">${convertFirstLetter(filter.type)}</label>
          </div>`);
}

function createFilterTemplate(filters, currentFilterType) {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}
      </form>
      </div>
    </div>`);
}

export default class Filters extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
