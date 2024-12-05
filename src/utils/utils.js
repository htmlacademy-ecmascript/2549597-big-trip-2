import dayjs from 'dayjs';

const checkNumberMoreNine = (number) => number > 9 ? '' : '0';

export const getDate = (date, format) => date ? dayjs(date).format(format) : '';

export const getDifferenceDate = (start, end) => {
  const dateFrom = dayjs(start);
  const dateTo = dayjs(end);

  return {
    days: dateTo.diff(dateFrom, 'd'),
    hours: dateTo.diff(dateFrom, 'h') % 24,
    minutes: dateTo.diff(dateFrom, 'm') % 60,
  };
};

export const isEscKey = (evt) => evt.key === 'Escape';

export const convertFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const getConvertedTime = ({days, hours, minutes}) => {
  const formattedDays = days ? `${checkNumberMoreNine(days)}${days}D ` : '';
  const formattedHours = `${checkNumberMoreNine(hours)}${hours}H `;
  const formattedMinutes = `${checkNumberMoreNine(minutes)}${minutes}M `;

  return formattedDays + formattedHours + formattedMinutes;
};
