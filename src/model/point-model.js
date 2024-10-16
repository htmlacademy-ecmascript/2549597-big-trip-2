import {RoutePoints} from '../mock/new-point.js';

export default class PointModel {
  #points = RoutePoints;

  get points() {
    return this.#points;
  }
}
