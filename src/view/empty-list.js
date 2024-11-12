import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constants.js';

const EmptyListText = {
  [FilterType.EVERTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createNoPointList(filterType) {
  const noPointTextValue = EmptyListText[filterType];

  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
}

export default class EmptyList extends AbstractView{
  #messageType = null;

  constructor({messageType}) {
    super();
    this.#messageType = messageType;
  }

  get template() {
    return createNoPointList(this.#messageType);
  }
}
