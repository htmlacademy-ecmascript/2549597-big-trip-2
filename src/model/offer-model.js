import {offers} from '../mock/offer.js';

export default class OfferModel {
  #offers = offers;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return offers.find((offer) => offer.type === type);
  }
}
