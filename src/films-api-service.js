import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateMovies = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (movie) => {
    const filmInfo = movie.filmInfo;
    const userDetails = movie.userDetails;

    const adaptedFilmInfo = {...filmInfo,
      'alternative_title': filmInfo.alternativeTitle,
      'total_rating': filmInfo.totalRating,
      'age_rating': filmInfo.ageRating,

      release: {...filmInfo.release,
        'release_country': filmInfo.release.releaseCountry
      }
    };

    delete adaptedFilmInfo.alternativeTitle;
    delete adaptedFilmInfo.totalRating;
    delete adaptedFilmInfo.ageRating;
    delete adaptedFilmInfo.release.releaseCountry;

    const adaptedUserDetails = {...userDetails,
      'already_watched': userDetails.alreadyWatched,
      'watching_date': userDetails.watchingDate,
    };

    delete adaptedUserDetails.alreadyWatched;
    delete adaptedUserDetails.watchingDate;

    const adaptedMovie = {...movie,
      'film_info': adaptedFilmInfo,
      'user_details': adaptedUserDetails,
    };

    delete adaptedMovie.filmInfo;
    delete adaptedMovie.userDetails;

    return adaptedMovie;
  };
}
