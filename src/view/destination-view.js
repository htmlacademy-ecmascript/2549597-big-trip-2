import AbstractView from '../framework/view/abstract-view.js';
import {getDestination} from '../utils/point.js';
const getMarkupDestination = (destinations, points) => {
  switch (points.length) {
    case points.length > 3:
      return `${getDestination(points[0].destinationId, destinations).townName} ... ${getDestination(points[points.length - 1].destinationId, destinations).townName}`;
    case 3:
      return `${getDestination(points[0].destinationId, destinations).townName} - ${getDestination(points[1].destinationId, destinations).townName} - ${getDestination(points[points.length - 1].destinationId, destinations).townName}`;
    case 2:
      return `${getDestination(points[0].destinationId, destinations).townName} - ${getDestination(points[1].destinationId, destinations).townName}`;
    case 1:
      return `${getDestination(points[0].destinationId, destinations).townName}`;
  }
};

const createDestinationTemplate = (points, destinations) => {
  if (!points) {
    return '';
  }

  return `<div class="destination-from-destination-to">${getMarkupDestination(destinations, points)}</div>`;
};

export default class Destination extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createDestinationTemplate(this.#points, this.#destinations);
  }
}
