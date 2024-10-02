import dayjs from 'dayjs';

const FORMAT_DATE = 'DD/MM/YYYY';

export const isPointPast = (date) =>
  date && date.format(FORMAT_DATE).isSame(dayjs().format(FORMAT_DATE)) || date.isBefore(dayjs());

export const isPointPresent = (dateStart, dateEnd) =>
  dateStart && dateEnd && dateStart.format(FORMAT_DATE).isSame(dayjs().format(FORMAT_DATE)) && dateEnd.format(FORMAT_DATE).isSame(dayjs().format(FORMAT_DATE));

export const isPointFuture = (date) =>
  date && dayjs().format(FORMAT_DATE).isBefore(date.format(FORMAT_DATE));
