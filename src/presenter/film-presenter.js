import {render, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupFilmView from '../view/popup-film-view.js';

export default class FilmPresenter {

  #filmListContainer = null;
  #filmComponent = null;
  #popupComponent = null;

  #movie = null;

  constructor(filmListContainer) {
    this.#filmListContainer = filmListContainer;
  }

  init = (movie) => {
    this.#movie = movie;

    this.#filmComponent = new FilmCardView(movie);
    this.#popupComponent = new PopupFilmView(movie);

    this.#filmComponent.setClickHandler(() => {
      this.#openPopup(movie);
    });

    this.#popupComponent.setCloseClickHandler(() => {
      this.#closePopup(movie);
    });

    render(this.#filmComponent, this.#filmListContainer);
  };

  #openPopup = () => {
    render(this.#popupComponent, document.body);
    document.body.classList.add('hide-overflow');
  };

  #closePopup = () => {
    remove(this.#popupComponent);
    document.body.classList.remove('hide-overflow');
  };
}
