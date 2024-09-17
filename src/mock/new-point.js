import {getRandomArrayElement, getRandomValue} from '../utils.js';
import * as CONSTANTS from '../constants.js';

const getRoutePoint = (index) => ({
  id: index,
  type: getRandomArrayElement(CONSTANTS.ROUTE_TYPES),
  timeStart: CONSTANTS.TIME.start[index],
  timeEnd: CONSTANTS.TIME.end[index],
  price: getRandomValue(0, CONSTANTS.MAX_PRICE),
  isFavorite: getRandomArrayElement(CONSTANTS.FAVORITE),
});

export const RoutePoints = Array.from({length: CONSTANTS.MAX_POINTS}, (_, i) => getRoutePoint(i));

export function getRandomPoint() {
  return getRandomArrayElement(RoutePoints);
}
