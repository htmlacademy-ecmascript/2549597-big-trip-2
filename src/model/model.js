import {getRandomPoint} from '../mock/new-point.js';

const POINT_COUNT = 5;

export default class NewPoint {
  point = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoint() {
    return this.point;
  }
}
