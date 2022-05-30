import Observable from '../framework/observable.js';
import {CARD_COUNT, FilterType} from '../const.js';
import {genetateMovieCard} from '../mock/movie-template.js';

export default class MovieModel extends Observable {
  #movies = Array.from({length: CARD_COUNT}, genetateMovieCard);

  get movies() {
    return this.#movies;
  }

  get count() {
    return this.#movies.length;
  }

  get filtered() {
    return ({
      [FilterType.ALL]: () => this.#movies,
      [FilterType.WATCHLIST]: () => this.#movies.filter((movie) => movie.userDetails.watchlist),
      [FilterType.HISTORY]: () => this.#movies.filter((movie) => movie.userDetails.alreadyWatched),
      [FilterType.FAVORITES]: () => this.#movies.filter((movie) => movie.userDetails.favorite)
    });
  }

  updateFilm = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
