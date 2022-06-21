import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';
import {UserAction, UpdateType, END_POINT, AUTHORIZATION, TimeLimit} from '../const.js';
import CommentsApiService from '../comments-api-service.js';
import CommentsModel from '../model/comments-model.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #filmListContainer = null;
  #filmComponent = null;
  #popupComponent = null;
  #changeData = null;
  #changeMode = null;

  #movie = null;
  #mode = Mode.DEFAULT;

  #commentsModel = null;

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
    this.#commentsModel.addObserver(this.#handleCommentsModelChange);
  }

  #handleCommentsModelChange = (updateType) => {
    switch (updateType) {
      case UserAction.ADD_COMMENT:
        this.#changeData(
          UserAction.ADD_COMMENT,
          UpdateType.MINOR,
          this.#movie
        );
        break;
      case UserAction.DELETE_COMMENT:
        this.#changeData(
          UserAction.DELETE_COMMENT,
          UpdateType.MINOR,
          //this.#movie
        );
        break;
    }
  };

  get isOpened() {
    return this.#mode === Mode.OPENED;
  }

  get movieId() {
    return this.#movie.id;
  }

  destroyOnlyCard = () => {
    remove(this.#filmComponent);
  };

  init = (movie) => {
    this.#movie = movie;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView(movie);
    this.#popupComponent = new PopupFilmView({...movie, comments: this.#commentsModel?.comments || []});

    this.#filmComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#filmComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#filmComponent.setClickHandler(this.#openPopup);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#initPopup();
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  #initPopup = () => {
    this.#popupComponent.setCloseClickHandler(this.#closePopup);
    this.#popupComponent.setWatchlistClickHandler(this.#onWatchListClick);
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#popupComponent.setAddCommentHandler(this.#handleAddComment);
    this.#popupComponent.setDeleteCommentHandler(this.#handleDeleteComment);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
      this.#popupComponent.reset(this.#movie);
    }
  };

  setSaving = () => {
    this.#popupComponent.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  };

  setDeleting = () => {
    this.#popupComponent.updateElement({
      isDeleting: true,
      isDisabled: true,
    });
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#popupComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#popupComponent.updateElement({
        isDisabled: false,
        isDeleting: false,
        isSaving: true,
      });
    };

    this.#popupComponent.shake(resetFormState);
  };

  setAbortingForm = () => {
    this.#popupComponent.shake(this.#popupComponent.element.querySelector('.film-details__comment-input'));
  };

  #openPopup = async () => {
    await this.#commentsModel.init(this.#movie.id);
    const comments = this.#commentsModel.comments;
    this.#popupComponent = new PopupFilmView({...this.#movie, comments});

    render(this.#popupComponent, document.body);
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#changeMode();
    this.#mode = Mode.OPENED;

    this.#initPopup();
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);

    this.#mode = Mode.DEFAULT;
    this.#popupComponent.reset(this.#movie);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      this.#closePopup();
    }
  };

  #onWatchListClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}},
    );
  };

  #onAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}},
    );
  };

  #onFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}},
    );
  };

  #handleAddComment = (movie, newComment) => {
    this.setSaving();
    this.#uiBlocker.block();
    try {
      this.#commentsModel.addComment(newComment, movie.id);
    } catch(err) {
      this.setAborting();
      this.setAbortingForm();
    }
    this.#uiBlocker.unblock();
  };

  #handleDeleteComment = (update) => {
    this.setDeleting();
    this.#uiBlocker.block();
    try {
      this.#commentsModel.deleteComment(update);
    } catch(err) {
      this.setAborting();
    }
    this.#uiBlocker.unblock();
  };

}
