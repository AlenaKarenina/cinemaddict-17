import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class MovieModel extends Observable {
  #filmsApiService = null;

  #movies = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
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
      //this.#movies = movies.map(this.#adaptToClient);
      this.#movies = movies.map(MovieModel.adaptToClient);
    } catch(err) {
      this.#movies = [];
    }
    this._notify(UpdateType.INIT);
  };

  updateFilm = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#filmsApiService.updateMovies(update);
      //const updatedFilm = this.#adaptToClient(response);
      const updatedFilm = MovieModel.adaptToClient(response);
      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedFilm,
        ...this.#movies.slice(index + 1),
      ];
      this._notify(updateType, updatedFilm);
    } catch(err) {
      throw new Error('Can\'t update movies');
    }
  };

  static adaptToClient = (movie) => {
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
      filmInfo: adaptedFilmInfo,
      userDetails: adaptedUserDetails,
    };

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  };
}
