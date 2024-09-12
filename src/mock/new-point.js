import {getRandomArrayElement, getRandomValue} from '../utils.js';
import * as CONSTANTS from '../constants.js';
import {offers} from './offer.js';
import {destinationCards} from './destination.js';

const getRoutePoint = () => ({
  type: getRandomArrayElement(CONSTANTS.ROUTE_TYPES),
  destination: getRandomArrayElement(CONSTANTS.DESTINATIONS),
  timeStart: getRandomArrayElement(CONSTANTS.TIME.start),
  timeEnd: getRandomArrayElement(CONSTANTS.TIME.end),
  price: getRandomValue(0, CONSTANTS.MAX_PRICE),
  offers: Array.from({length: getRandomValue(0, offers.length)}, () => getRandomArrayElement(offers)),
  destinationCard: getRandomArrayElement(destinationCards),
});

export const RoutePoints = Array.from({length: getRandomValue(0, CONSTANTS.MAX_POINTS)}, () => getRoutePoint());

export function getRandomPoint() {
  return getRandomArrayElement(RoutePoints);
}
