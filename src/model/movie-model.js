import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #filmsApiService = null;

  #movies = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.movies.then((movies) => {
      console.log(movies.map(this.#adaptToClient));
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

  init = async () => {
    try {
      const movies = await this.#filmsApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }
  };

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

  #adaptToClient = (movie) => {
    const filmInfo = movie.film_info;
    const userDetails = movie.user_details;

    const adaptedFilmInfo = {...filmInfo,
      alternativeTitle: filmInfo.alternative_title,
      totalRating: filmInfo.total_rating,
      ageRating: filmInfo.age_rating,

      release: {
        ...filmInfo.release,
        releaseCountry: filmInfo.release.release_country
      }
    };

    delete adaptedFilmInfo.alternative_title;
    delete adaptedFilmInfo.total_rating;
    delete adaptedFilmInfo.age_rating;
    delete adaptedFilmInfo.release.release_country;

    const adaptedUserDetails = {...userDetails,
      alreadyWatched: userDetails.already_watched,
      watchingDate: userDetails.watching_date,
    };

    delete adaptedUserDetails.already_watched;
    delete adaptedUserDetails.watching_date;

    const adaptedMovie = {...movie,
      commentsIds: movie.comments,
      filmInfo: adaptedFilmInfo,
      userDetails: adaptedUserDetails,
    };

    delete adaptedMovie.comments;
    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  };
}
