const COMMENT_COUNT = 50;

const CARD_COUNT = 20;

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const FilterName = {
  [FilterType.ALL]: 'All movies',
  [FilterType.WATCHLIST]: 'Watchlist',
  [FilterType.HISTORY]: 'History',
  [FilterType.FAVORITES]: 'Favorites'
};

export {CARD_COUNT, COMMENT_COUNT, FilterType, FilterName};
