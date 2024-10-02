import AbstractView from '../framework/view/abstract-view.js';
import {convertFirstLetter} from '../utils/utils.js';
import {FilterType} from '../constants.js';

function createFilterItemTemplate(filter) {
  return (`<div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${(filter === 'everything') ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter}">${convertFirstLetter(filter)}</label>
          </div>`);
}

function createFilterTemplate() {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        ${Object.values(FilterType).map((filter) => createFilterItemTemplate(filter)).join('')}
      </form>
      </div>
    </div>`);
}

export default class Filters extends AbstractView{
  get template() {
    return createFilterTemplate();
  }
}
