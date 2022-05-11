import {render, remove} from '../framework/render.js';
import SectionFilmsView from '../view/film-section.js';
import ContainerListFilms from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/film-details-popup-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import CommentView from '../view/comment-popup-view.js';
import NoMovieView from '../view/no-film-card-view.js';
import FilterView from '../view/filter-view.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class FilmsPresenter {

  #sectionFilms = new SectionFilmsView;
  #containerFilms = new ContainerListFilms;
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #sectionMovie = [];
  #movieModel = null;
  #filmListContainer = null;
  #renderedMovieCount = SHOW_FILM_COUNT_STEP;

  #createFilm = (movie) => {
    const filmComponent = new FilmCardView(movie);
    const popupComponent = new PopupFilmView(movie);

    render(filmComponent, this.#containerFilms.element);

    const openPopup = () => {
      document.body.appendChild(popupComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const closePopup = () => {
      document.body.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.setClickHandler(() => {
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);

      const commentList = document.querySelector('.film-details__comments-list');
      this.pasteComments(commentList, movie);
    });

    popupComponent.setCloseClickHandler(() => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };

  constructor(filmListContainer, movieModel) {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;
  }

  init = () => {
    this.#sectionMovie = [...this.#movieModel.movie];

    this.#renderMovie();
  };

  #renderMovie = () => {

    if (this.#sectionMovie.length === 0) {
      render(new NoMovieView(), this.#filmListContainer);
    } else {
      render(new FilterView(), this.#filmListContainer);
      render(this.#sectionFilms, this.#filmListContainer);
      render(this.#containerFilms, this.#sectionFilms.element);
    }

    for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
      this.#createFilm(this.#sectionMovie[i]);
    }

    if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
      render(this.#loadMoreButtonComponent, this.#sectionFilms.element);

      this.#loadMoreButtonComponent.setClickLoadHandler(this.#handleLoadMoreButtonClick);
    }

  };

  #handleLoadMoreButtonClick = () => {
    this.#sectionMovie
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + SHOW_FILM_COUNT_STEP)
      .forEach((element) => this.#createFilm(element));

    this.#renderedMovieCount += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovieCount >= this.#sectionMovie.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #place = null;
  #commentsModel = null;
  #sectionComment = [];

  pasteComments = (place, commentsModel) => {
    this.#place = place;
    this.#commentsModel = commentsModel;
    this.#sectionComment = [...this.#commentsModel.comments];

    for (let i = 0; i < this.#sectionComment.length; i++) {
      render(new CommentView(this.#sectionComment[i]), this.#place);
    }
  };
}
