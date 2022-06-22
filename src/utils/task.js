import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const humanizeDueDate = (dueDate) => dayjs(dueDate).format('YYYY');

const humanizeCommentDateTime = (date) => dayjs(date).fromNow();

const humanizeFormatDate = (date, format) => dayjs(date).format(format);

const humanizeDurationFormat = (runTime) => dayjs.duration(runTime, 'minutes').format('H[h] mm[m]');

const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

const sortFilmsByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

export {humanizeDueDate, sortFilmsByRating, sortFilmsByDate, humanizeCommentDateTime, humanizeFormatDate, humanizeDurationFormat};
