import {createElement} from '../render.js';

function createRouteListPointsTemplate() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class RouteListPoints {
  getTemplate() {
    return createRouteListPointsTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
