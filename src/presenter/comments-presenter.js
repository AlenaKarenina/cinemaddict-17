import {remove, render, replace} from '../framework/render.js';
import PopupFilmView from '../view/popup-film-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class CommentsPresenter {
  #commentsContainer = null;
  #commentsComponent = null;
  #commentsModel = null;
  #changeData = null;

  constructor(commentsContainer, commentsModel, changeData) {
    this.#commentsContainer = commentsContainer;
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleCommentModelChange);
  }

  destroy = () => {
    remove(this.#commentsComponent);
  };

  init(movie) {
    const prevCommentsComponent = this.#commentsComponent;
    this.#commentsComponent = new PopupFilmView(movie, movie.comments, this.#commentsModel.comments, this.#changeData);
    if (!prevCommentsComponent) {
      render(this.#commentsComponent, this.#commentsContainer);
      return;
    }
    if (this.#commentsContainer.contains(prevCommentsComponent.element)) {
      replace(this.#commentsComponent, prevCommentsComponent);
    }
    remove(prevCommentsComponent);
  }

  #handleFormSubmit = (movie) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...movie},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleCommentModelChange = (updateType, updatedFilm) => {
    this.init(updatedFilm);
  };
}
