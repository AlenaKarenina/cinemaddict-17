import {render, RenderPosition} from '../render.js';
import SectionFilmsView from '../view/film-section.js';
import ContainerListFilms from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/film-details-popup-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import CommentView from '../view/comment-popup-view.js';

export default class FilmsPresenter {

  #sectionFilms = new SectionFilmsView;
  #containerFilms = new ContainerListFilms;
  #sectionMovie = [];
  #movieModel = null;
  #filmListContainer = null;

  #renderFilm = (movie) => {
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

    filmComponent.element.querySelector('.film-card__poster').addEventListener('click', () => {
      openPopup();
      document.addEventListener('keydown', onEscKeyDown);

      const commentList = document.querySelector('.film-details__comments-list');
      this.pasteComments(commentList, movie);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };


  init = (filmListContainer, movieModel) => {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;
    this.#sectionMovie = [...this.#movieModel.movie];

    render(this.#sectionFilms, this.#filmListContainer);
    render(this.#containerFilms, this.#sectionFilms.element);

    for (let i = 0; i < this.#sectionMovie.length; i++) {
      this.#renderFilm(this.#sectionMovie[i]);
    }

    render(new LoadMoreButtonView(), this.#sectionFilms.element);
  };

  #place = null;
  #commentsModel = null;
  #sectionComment = [];

  pasteComments = (place, commentsModel) => {
    this.#place = place;
    this.#commentsModel = commentsModel;
    this.#sectionComment = [...this.#commentsModel.comments];

    for (let i = 0; i < this.#sectionComment.length; i++) {
      render(new CommentView(this.#sectionComment[i]), this.#place, RenderPosition.BEFOREEND);
    }
  };
}
