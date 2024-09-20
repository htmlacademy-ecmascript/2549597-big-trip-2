import {getRandomArrayElement, getRandomValue} from '../utils.js';
import {MAX_PRICE, DESCRIPTION, DESTINATIONS} from '../constants.js';

const getDescription = () => (Array.from({length: getRandomValue(0, DESCRIPTION.length)}, () => getRandomArrayElement(DESCRIPTION))).join(' ');

const getPhotoSrc = () => `https://loremflickr.com/248/152?random=${getRandomValue(0, MAX_PRICE)}`;

const getPhotos = () => Array.from({length: getRandomValue(0, DESTINATIONS.length)}, getPhotoSrc);

const getDestinationCard = (index) => ({
  id: index,
  description: getDescription(),
  photos: getPhotos(),
  townName: getRandomArrayElement(DESTINATIONS),
});

export const destinationCards = Array.from({length: DESTINATIONS.length}, (_, i) => getDestinationCard(i));