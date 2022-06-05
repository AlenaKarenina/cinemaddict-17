import Observable from '../framework/observable.js';
import {CARD_COUNT} from '../const.js';
import {genetateMovieCard} from '../mock/movie-template.js';

export default class MovieModel extends Observable {
  #filmsApiService = null;

  #movies = Array.from({length: CARD_COUNT}, genetateMovieCard);

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.movies.then((movies) => {
      console.log(movies);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get movies() {
    return this.#movies;
  }

  get count() {
    return this.#movies.length;
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
