import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListText} from '../constants.js';

function createEmptyList(messageType) {
  return `<p class="trip-events__msg">${EmptyListText[messageType]}</p>`;
}

export default class EmptyList extends AbstractView{
  #messageType = null;

  constructor({messageType}) {
    super();
    this.#messageType = messageType;
  }

  get template() {
    return createEmptyList(this.#messageType);
  }
}
