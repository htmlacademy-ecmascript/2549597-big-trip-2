import {destinationCards} from '../mock/destination.js';

export default class DestinationModel {
  #destinationCards = destinationCards;

  get destination() {
    return this.#destinationCards;
  }

  getDestinationById(id) {
    return destinationCards.find((destination) => destination.id === id);
  }
}
