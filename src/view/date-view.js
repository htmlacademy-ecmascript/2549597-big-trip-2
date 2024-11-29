import AbstractView from '../framework/view/abstract-view.js';
import {getCurrentDate} from '../utils/point.js';

const getDate = (points) => {
  switch (points) {
    case 1:
      return `${getCurrentDate(points.timeStart)} - ${getCurrentDate(points.timeEnd)}`;
    default:
      return `${getCurrentDate(points[0].timeStart)} - ${getCurrentDate(points[points.length - 1].timeEnd)}`;
  }
};

const createDateTemplate = (points) => {
  if (!points) {
    return '<div class="date-from-date-to"></div>';
  }

  return `<div class="date-from-date-to">${getDate(points)}</div>`;
};

export default class CurrendDate extends AbstractView {
  #points = null;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createDateTemplate(this.#points);
  }
}
