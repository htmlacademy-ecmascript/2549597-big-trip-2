import dayjs from 'dayjs';

export const isPointPast = (date) => date && dayjs().isAfter(date);

export const isPointPresent = (dateStart, dateEnd) => dateStart && dateEnd && dayjs().isAfter(dateStart) && dayjs().isBefore(dateEnd);

export const isPointFuture = (date) => dayjs().isBefore(date);

export const sortPointsByDay = (dateFrom, dateTo) => dayjs(dateFrom.timeStart).diff(dayjs(dateTo.timeStart));

export const sortPointsByTime = (dateFrom, dateTo) => dayjs(dateTo.timeEnd).diff(dayjs(dateTo.timeStart)) - dayjs(dateFrom.timeEnd).diff(dayjs(dateFrom.timeStart));

export const sortPointsByPrice = (dateFrom, dateTo) => dateTo.price - dateFrom.price;

export const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type)?.offers || [];

export const getDestination = (id, destinations) => destinations.find((destination) => destination.id === id);
