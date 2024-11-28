import AbstractView from '../framework/view/abstract-view.js';

const createTotalPriceTemplate = (price) => `<div class="total-price">Total : \u20AC ${price}</div>`;

export default class TotalPrice extends AbstractView {
  #totalPrice = null;

  constructor({totalPrice}) {
    super();
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTotalPriceTemplate(this.#totalPrice);
  }
}
