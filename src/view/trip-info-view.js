import AbstractView from '../framework/view/abstract-view.js';
import {getPriceWithoutOffers, getPontOffersPrice, getDestination, getCurrentDate, sortPointsByDay} from '../utils/point.js';

const getDate = (points) => {
  switch (points) {
    case 1:
      return `${getCurrentDate(points.timeStart)} - ${getCurrentDate(points.timeEnd)}`;
    default:
      return `${getCurrentDate(points[0].timeStart)} - ${getCurrentDate(points[points.length - 1].timeEnd)}`;
  }
};

const getMarkupDestination = (destinations, points) => {
  switch (points.length) {
    case 3:
      return `${getDestination(points[0].destinationId, destinations)?.townName} - ${getDestination(points[1].destinationId, destinations)?.townName} - ${getDestination(points[points.length - 1].destinationId, destinations)?.townName}`;
    case 2:
      return `${getDestination(points[0].destinationId, destinations)?.townName} - ${getDestination(points[1].destinationId, destinations)?.townName}`;
    case 1:
      return `${getDestination(points[0].destinationId, destinations)?.townName}`;
    default:
      return `${getDestination(points[0].destinationId, destinations)?.townName} ... ${getDestination(points[points.length - 1].destinationId, destinations)?.townName}`;
  }
};

const getPrice = (points, offers) => getPriceWithoutOffers(points) + points.reduce((sum, point) => sum + getPontOffersPrice(point, offers), getPriceWithoutOffers(points));

const createTripInfoTemplate = (points, destinations, offers) =>
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getMarkupDestination(destinations, points)}</h1>
      <p class="trip-info__dates">${getDate(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPrice(points, offers)}</span>
    </p>
  </section>`;

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({points, destinations, offers}) {
    super();
    this.#points = points.sort(sortPointsByDay);
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
