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

  return dateTo.diff(dateFrom, 's');
};

export const isEscKey = (evt) => evt.key === 'Escape';

export const convertFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export const getConvertedTime = (seconds) => {
  const days = parseInt(seconds / (24 * 3600), 10);

  seconds = seconds % (24 * 3600);

  const hours = parseInt(seconds / 3600, 10);

  seconds %= 3600;

  const minutes = seconds / 60;

  return `${days}D ${hours}H ${minutes}M`;
};
