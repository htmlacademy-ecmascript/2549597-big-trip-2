
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDate} from '../utils/utils.js';
import {getOffersByType, getDestination} from '../utils/point.js';
import {DESTINATIONS} from '../constants.js';

const getPhoto = (photos) => {
  let markupPhotos = '';

  for (const photo of photos) {
    markupPhotos += `<img class="event__photo" src=${photo} alt="Event photo"></img>`;
  }

  return markupPhotos;
};

const getDestinations = (destinations) => {
  let markupDestinations = '';

  for (const destination of destinations) {
    markupDestinations += `<option value="${destination}"></option>`;
  }

  return markupDestinations;
};
const getOffer = (offers) => {
  let markupOffer = '';

  for (const offer of offers) {
    markupOffer += `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
  }

  return markupOffer;
};

function createFormEditTemplate(point, destination, offers) {
  const {type, timeStart, timeEnd, price} = point;
  const currentDestination = getDestination(point.destinationId, destination.destination);
  const {photos, description, townName} = currentDestination;

  const currentOffers = getOffersByType(type, offers.offers);
  const photoArray = getPhoto(photos);
  const dateStart = getDate(timeStart, 'DD/MM/YY HH:mm');
  const dateEnd = getDate(timeEnd, 'DD/MM/YY HH:mm');

  return (`<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${townName} list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${getDestinations(DESTINATIONS)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${price}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${getOffer(currentOffers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoArray}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`);
}

export default class FormEdit extends AbstractStatefulView{
  #point = null;
  #destination = null;
  #offer = null;
  #handleSubmit = null;
  #handleFormDelete = null;
  #handleCloseForm = null;

  constructor({point, destination, offer, onSubmit, onFormDeleteClick, onCloseForm}) {
    super();
    this._setState(FormEdit.parsePointToState(point));
    this.#destination = destination;
    this.#offer = offer;
    this.#handleSubmit = onSubmit;
    this.#handleFormDelete = onFormDeleteClick;
    this.#handleCloseForm = onCloseForm;

    this._restoreHandlers();
  }

  reset(point) {
    this.updateElement(
      FormEdit.parsePointToState(point),
    );
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(FormEdit.parseStateToPoint(this._state));
  };

  #deleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(FormEdit.parseStateToPoint(this._state));
  };

  #handleClose = (evt) => {
    evt.preventDefault();
    this.#handleCloseForm(FormEdit.parseStateToPoint(this._state));
  };

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#submitHandler);
    this.element.addEventListener('reset', this.#deleteHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleClose);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#formPriceHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#formVehicleTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#formDestinationHandler);
  }

  #formVehicleTypeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.event__label').textContent = evt.target.value;

    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offer: [],
    });
  };

  #formDestinationHandler = (evt) => {
    evt.preventDefault();

    const currentDestination = this.#destination.destination.find((destination) => destination.townName === evt.target.value);

    if(!currentDestination) {
      this.updateElement({
        ...this._state,
      });

      return;
    }

    this.updateElement({
      ...this._state,
      destinationId:  currentDestination.id,
    });
  };

  #formPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({...this._state,
      price: Number(evt.target.value),
    });
  };

  get template() {
    return createFormEditTemplate(this._state, this.#destination, this.#offer);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    this.point = {...state};
    return this.point;
  }
}
