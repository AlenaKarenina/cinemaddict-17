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
    const rank = getRank(this.#movie);

    if (rank) {
      this.#renderProfile(rank);
      return;
    }

    remove(this.#profileComponent);
    this.#profileComponent = null;
  };

  #renderProfile = (rank) => {
    const prevProfileComponent = this.#profileComponent;
    this.#profileComponent = new ProfileView(rank);

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
