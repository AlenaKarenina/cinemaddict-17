import {render, RenderPosition} from '../render.js';
import {getRandomInteger} from '../utils.js';
import SectionFilmsView from '../view/film-section.js';
import ContainerListFilms from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/film-details-popup-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import CommentView from '../view/comment-popup-view.js';

export default class FilmsPresenter {

  sectionFilms = new SectionFilmsView;
  containerFilms = new ContainerListFilms;

  init = (filmListContainer, movieModel) => {
    this.filmListContainer = filmListContainer;
    this.movieModel = movieModel;
    this.sectionMovie = [...this.movieModel.getMovie()];

    render(this.sectionFilms, this.filmListContainer);
    render(this.containerFilms, this.sectionFilms.getElement());

    for (let i = 0; i < this.sectionMovie.length; i++) {
      render(new FilmCardView(this.sectionMovie[i]), this.containerFilms.getElement());
    }

    render(new PopupFilmView(this.sectionMovie[getRandomInteger(0, this.sectionMovie.length - 1)]), document.body);

    render(new LoadMoreButtonView(), this.sectionFilms.getElement());
  };

  pasteComments = (place, commentsModel) => {
    this.place = place;
    this.commentsModel = commentsModel;
    this.sectionComment = [...this.commentsModel.getComment()];

    const commentsList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < this.sectionComment.length; i++) {
      render(new CommentView(this.sectionComment[i]), commentsList);
    }
  };
}
