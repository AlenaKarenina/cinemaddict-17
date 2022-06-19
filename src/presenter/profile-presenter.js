import ProfileView from '../view/profile-view.js';
import {getRank} from '../utils/user-rank.js';
import {remove, render, replace} from '../framework/render.js';

export default class ProfilePresenter {

  #movieModel;
  #profileContainer;
  #profileComponent = null;
  #movie = [];

  constructor(profileContainer, moviesModel) {
    this.#profileContainer = profileContainer;
    this.#movieModel = moviesModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#movie = this.#movieModel.movies;
    const rang = getRank(this.#movie);

    if (rang) {
      this.#renderProfile(rang);
      return;
    }

    remove(this.#profileComponent);
    this.#profileComponent = null;
  };

  #renderProfile = (rang) => {
    const prevProfileComponent = this.#profileComponent;
    this.#profileComponent = new ProfileView(rang);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#profileContainer);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
