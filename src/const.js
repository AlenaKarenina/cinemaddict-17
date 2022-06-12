const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const SHOW_FILM_COUNT_STEP = 5;

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  INIT: 'INIT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

const AUTHORIZATION = 'Basic hS8sfS13wgl7sa2i';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export {FilterType, SHOW_FILM_COUNT_STEP, SortType, UserAction, UpdateType, AUTHORIZATION, END_POINT, EMOJIS, Method};
