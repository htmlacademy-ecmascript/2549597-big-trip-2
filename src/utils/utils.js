import dayjs from 'dayjs';

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const getRandomValue = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getDate = (date, format) => date ? dayjs(date).format(format) : '';

export const getDifferenceDate = (start, end) => {
  const dateFrom = dayjs(start);
  const dateTo = dayjs(end);

  return dateTo.diff(dateFrom, 'm');
};

export const isEscKey = (evt) => evt.key === 'Escape';

export const convertFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
