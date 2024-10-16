import {getRandomArrayElement, getRandomValue} from '../utils/utils.js';
import * as CONSTANTS from '../constants.js';
import {nanoid} from 'nanoid';
import {destinationCards} from './destination.js';

const getRoutePoint = (index) => ({
  id: nanoid(),
  type: getRandomArrayElement(CONSTANTS.ROUTE_TYPES),
  timeStart: CONSTANTS.TIME.start[index],
  timeEnd: CONSTANTS.TIME.end[index],
  price: getRandomValue(0, CONSTANTS.MAX_PRICE),
  isFavorite: getRandomArrayElement(CONSTANTS.FAVORITE),
  destinationId: getRandomArrayElement(destinationCards).id,
});

export const RoutePoints = Array.from({length: CONSTANTS.MAX_POINTS}, (_, i) => getRoutePoint(i));

export function getRandomPoint() {
  return getRandomArrayElement(RoutePoints);
}
