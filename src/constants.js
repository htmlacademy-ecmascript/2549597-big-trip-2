export const ROUTE_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];
// export const DESTINATIONS = [
//   'Amsterdam',
//   'Chamonix',
//   'Geneva',
//   'Berlin',
//   'Tokio',
//   'France',
// ];
export const MAX_PRICE = 10000;
export const MAX_POINTS = 6;
export const TIME = {
  start: [
    '2025-04-02 02:17',
    '2025-04-04 03:05',
    '2020-02-06 03:22',
    '2025-04-08 11:56',
    '2024-11-05 22:22',
    '2024-03-12 21:00'
  ],
  end: [
    '2025-04-02 02:19',
    '2025-04-04 03:17',
    '2020-02-08 04:17',
    '2025-04-08 12:00',
    '2024-11-14 22:30',
    '2024-04-12 21:05',
  ],
};
export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
export const FAVORITE = [true, false];
export const FilterType = {
  PAST: 'past',
  EVERTHING: 'everthing',
  PRESENT: 'present',
  FUTURE: 'future',
};
export const SortTypes = {
  PRICE: 'price',
  DAY: 'day',
  TIME: 'time',
};

export const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
