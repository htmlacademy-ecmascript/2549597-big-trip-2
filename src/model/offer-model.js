import {offers} from '../mock/offer.js';

export default class OfferModel {
  offers = offers;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return offers.find((offer) => offer.type === type);
  }
}
