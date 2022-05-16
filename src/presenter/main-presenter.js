import {render, remove} from '../framework/render.js';
import {SHOW_FILM_COUNT_STEP} from '../const.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmContainerView from '../view/film-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import {updateItem} from '../utils/common.js';

export default class FilmsPresenter {

  #filmSection = new FilmSectionView;
  #filmContainer = new FilmContainerView;
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #noFilmComponent = new NoFilmCardView();
  #sortComponent = new SortView();

  #sectionMovie = [];
  #movieModel = null;
  #filmListContainer = null;
  #renderedMovieCount = SHOW_FILM_COUNT_STEP;

  #filmPresenter = new Map();

  constructor(filmListContainer, movieModel) {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;
  }

  init = () => {
    this.#sectionMovie = [...this.#movieModel.movie];
    this.#renderMovie();
  };

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedMovieCount, this.#renderedMovieCount + SHOW_FILM_COUNT_STEP);

    this.#renderedMovieCount += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovieCount >= this.#sectionMovie.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderFilms = (from, to) => {
    this.#sectionMovie
      .slice(from, to)
      .forEach((element) => this.#createFilm(element));
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

  #handleFilmChange = (updatedTask) => {
    this.#sectionMovie = updateItem(this.#sectionMovie, updatedTask);
    this.#filmPresenter.get(updatedTask.id).init(updatedTask);
  };

  #createFilm = (movie) => {
    const filmPresenter = new FilmPresenter(this.#filmContainer.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmListContainer);
  };

  #renderFilmsList = () => {
    render(this.#filmSection, this.#filmListContainer);
    render(this.#filmContainer, this.#filmSection.element);

    this.#renderFilms(0, Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP));

    if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
      this.#renderLoadMoreButton();
    }
  };

  #renderMovie = () => {
    if (this.#sectionMovie.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    this.#renderFilmsList();
  };
}
