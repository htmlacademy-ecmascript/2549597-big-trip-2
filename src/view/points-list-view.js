import AbstractView from '../framework/view/abstract-view.js';

function createRouteListPointsTemplate() {
  return ('<ul class="trip-events__list"></ul>');
}

export default class RouteListPoints extends AbstractView{
  get template() {
    return createRouteListPointsTemplate();
  }
}
