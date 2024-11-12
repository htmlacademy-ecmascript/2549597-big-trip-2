import {FilterType} from '../constants.js';
import {isPointFuture, isPointPast, isPointPresent} from './point.js';

export const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.timeStart)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.timeEnd)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.timeStart, point.timeEnd)),
  [FilterType.EVERTHING]: (points) => points,
};
