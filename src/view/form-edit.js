
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDate} from '../utils/utils.js';
import {getOffersByType, getDestination} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const getAllDestination = (destinations) => destinations.map((destination) => destination.townName);

const getPhoto = (photos) => {
  let markupPhotos = '';

  for (const photo of photos) {
    markupPhotos += `<img class="event__photo" src=${photo.src} alt="${photo.description}"></img>`;
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

const getOffer = (offers, point, isDisabled) => {
  let markupOffer = '';
  const isChecked = (offerId) => point.offers && point.offers.includes(String(offerId)) ? 'checked' : '';

  for (const offer of offers) {
    markupOffer += `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox"
                        name="event-offer-${offer.id}" data-id=${offer.id} ${isChecked(offer.id)} ${isDisabled ? 'disabled' : ''}>
                        <label class="event__offer-label" for="event-offer-${offer.id}">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
  }

  return markupOffer;
};

function createFormEditTemplate(point, destination, offers) {
  const {type, timeStart, timeEnd, price, isDisabled, isSaving, isDeleting} = point;
  let currentDestination;

  if (point.destinationId === undefined) {
    currentDestination = '';
  } else {
    currentDestination = getDestination(point.destinationId, destination.destination);
  }

  const {photos, description, townName} = currentDestination || {};
  const currentOffers = getOffersByType(type, offers.offers) || [];

  const isChecked = (currentType) => type === currentType ? 'checked' : '';

  const photoArray = photos ? getPhoto(photos) : '';
  const dateStart = timeStart ? getDate(timeStart, 'DD/MM/YY HH:mm') : '';
  const dateEnd = timeEnd ? getDate(timeEnd, 'DD/MM/YY HH:mm') : '';

  return (`<li>
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${isChecked('taxi')}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${isChecked('bus')}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${isChecked('train')}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${isChecked('ship')}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${isChecked('drive')}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${isChecked('flight')}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${isChecked('check-in')}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${isChecked('sightseeing')}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${isChecked('restaurant')}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"  value="${townName || ''}"  list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1">
                      ${getDestinations(getAllDestination(destination.destination))}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${price} ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${getOffer(currentOffers, point, isDisabled)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description || ''}</p>
                    ${photoArray.length && `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoArray}
                      </div>
                    </div>`}
                  </section>
                </section>
              </form>
            </li>`);
}

export default class FormEdit extends AbstractStatefulView{
  #point = null;
  #destination = null;
  #offer = null;
  #handleSubmit = null;
  #handleFormDelete = null;
  #handleCloseForm = null;
  #datepickerStart = null;
  #datepickerEnd = null;

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
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#editOffersHandler);

    this.#setDatepicker();
  }

  #formVehicleTypeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.event__label').textContent = evt.target.value;

    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: [],
    });
  };

  #editOffersHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      offers: checkedBoxes.map((element) => element.dataset.id),
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

  removeElement() {
    super.removeElement();
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;

      return;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }

  }

  #dateStartChangeHandler = ([userDate]) => {
    this.updateElement({
      timeStart: userDate,
    });
  };

  #dateEndChangeHandler = ([userDate]) => {
    this.updateElement({
      timeEnd: userDate,
    });
  };

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dueDate,
        onChange: this.#dateStartChangeHandler,
      });

    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dueDate,
        onChange: this.#dateEndChangeHandler,
      }
    );
  }
}
