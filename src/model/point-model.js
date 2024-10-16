import {getRandomPoint} from '../mock/new-point.js';

const POINT_COUNT = 6;

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }
}
