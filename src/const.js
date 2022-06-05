const COMMENT_COUNT = 50;

const CARD_COUNT = 20;

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

export {CARD_COUNT, COMMENT_COUNT, FilterType, SHOW_FILM_COUNT_STEP, SortType, UserAction, UpdateType, AUTHORIZATION, END_POINT, EMOJIS};
