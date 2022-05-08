import {render} from '../render.js';
import {getRandomInteger} from '../utils.js';
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

  init = (filmListContainer, movieModel) => {
    this.#filmListContainer = filmListContainer;
    this.#movieModel = movieModel;
    this.#sectionMovie = [...this.#movieModel.movie];

    render(this.#sectionFilms, this.#filmListContainer);
    render(this.#containerFilms, this.#sectionFilms.element);

    for (let i = 0; i < this.#sectionMovie.length; i++) {
      render(new FilmCardView(this.#sectionMovie[i]), this.#containerFilms.element);
    }

    render(new PopupFilmView(this.#sectionMovie[getRandomInteger(0, this.#sectionMovie.length - 1)]), document.body);

    render(new LoadMoreButtonView(), this.#sectionFilms.element);
  };

  #place = null;
  #commentsModel = null;
  #sectionComment = [];

  pasteComments = (place, commentsModel) => {
    this.#place = place;
    this.#commentsModel = commentsModel;
    this.#sectionComment = [...this.#commentsModel.comment];

    const commentsList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < this.#sectionComment.length; i++) {
      render(new CommentView(this.#sectionComment[i]), commentsList);
    }
  };
}
