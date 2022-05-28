import {render, remove} from '../framework/render.js';
import {SHOW_FILM_COUNT_STEP} from '../const.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmContainerView from '../view/film-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import {sortFilmsByRating, sortFilmsByDate} from '../utils/task.js';
import {SortType} from '../const.js';

export default class FilmsPresenter {

  #filmSection = new FilmSectionView;
  #filmContainer = new FilmContainerView;
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #noFilmComponent = new NoFilmCardView();
  #sortComponent = new SortView();

  #movieModel = null;
  #filmListContainer = null;
  #renderedMovieCount = SHOW_FILM_COUNT_STEP;

  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(filmListContainer, movieModel) {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    switch (this.#currentSortType) {
      case SortType.RATING:
        return [...this.#movieModel.movies].sort(sortFilmsByRating);
      case SortType.DATE:
        return [...this.#movieModel.movies].sort(sortFilmsByDate);
    }

    return this.#movieModel.movies;
  }

  init = () => {
    this.#renderMovie();
  };

  #handleLoadMoreButtonClick = () => {
    const movieCount = this.movies.length;
    const newRenderedMovieCount = Math.min(movieCount, this.#renderedMovieCount + SHOW_FILM_COUNT_STEP);
    const movies = this.movies.slice(this.#renderedMovieCount, newRenderedMovieCount);

    this.#renderFilms(movies);
    this.#renderedMovieCount = newRenderedMovieCount;

    if (this.#renderedMovieCount >= movieCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderFilms = (movies) => {
    movies.forEach((element) => this.#createFilm(element));
  };

  #renderNoFilms = () => {
    render(this.#noFilmComponent, this.#filmListContainer);
  };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#filmSection.element);
    this.#loadMoreButtonComponent.setClickLoadHandler(this.#handleLoadMoreButtonClick);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedMovieCount = SHOW_FILM_COUNT_STEP;
    remove(this.#loadMoreButtonComponent);
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #createFilm = (movie) => {
    const filmPresenter = new FilmPresenter(this.#filmContainer.element, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList();
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmListContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmsList = () => {
    const movieCount = this.movies.length;
    const movies = this.movies.slice(0, Math.min(movieCount, SHOW_FILM_COUNT_STEP));

    render(this.#filmSection, this.#filmListContainer);

    render(this.#filmContainer, this.#filmSection.element);

    this.#renderFilms(movies);

    if (movieCount > SHOW_FILM_COUNT_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderMovie = () => {
    if (this.movies.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmsList();
  };
}
