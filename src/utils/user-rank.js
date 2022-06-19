export const getRank = (movies) => {
  const watched = movies.filter((item) => item.userDetails.alreadyWatched);
  const watchedCount = watched.length;

  const Rank = {
    NONE: '',
    NOVICE: 'Novice',
    FAN: 'Fan',
    MOVIE_BUFF: 'Movie Buff',
  };

  const NONE_COUNT = 0;
  const NOVICE_COUNT = 1;
  const FAN_COUNT = 11;
  const MOVIE_BUFF_COUNT = 21;

  if (watchedCount === NONE_COUNT) {
    return '';
  }

  if (watchedCount >= NOVICE_COUNT && watchedCount <= 10) {
    return Rank.NOVICE;
  }

  if (watchedCount >= FAN_COUNT && watchedCount <= 20) {
    return Rank.FAN;
  }

  if (watchedCount >= MOVIE_BUFF_COUNT) {
    return Rank.MOVIE_BUFF;
  }
};
