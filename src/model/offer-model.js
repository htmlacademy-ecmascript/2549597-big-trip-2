import {UpdateType} from '../constants.js';
import Observable from '../framework/observable.js';
export default class OfferModel extends Observable{
  #offers = [];
  #offersApiService = null;

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }
}
