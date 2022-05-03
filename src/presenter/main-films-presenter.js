import {render} from '../render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilms from '../view/film-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';

const CARD_COUNT = 5;

export default class FilmsPresenter {

  sectionFilms = new NewSectionFilmsView;
  containerFilms = new ContainerListFilms;

  init = (filmListContainer) => {
    this.filmListContainer = filmListContainer;

    render(this.sectionFilms, this.filmListContainer);
    render(this.containerFilms, this.sectionFilms.getElement());

    for (let i = 0; i < CARD_COUNT; i++) {
      render(new FilmCardView, this.containerFilms.getElement());
    }

    render(new LoadMoreButtonView, this.sectionFilms.getElement());
  };
}
