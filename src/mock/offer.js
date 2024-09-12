import {CHECKED, MAX_PRICE, TITLES} from '../constants.js';
import {getRandomArrayElement, getRandomValue} from '../utils.js';

const getOffer = (index) => ({
  title: TITLES[index],
  price: getRandomValue(0, MAX_PRICE),
  checked: getRandomArrayElement(CHECKED),
});

export const offers = Array.from({length: TITLES.length}, (_, i) => getOffer(i));


