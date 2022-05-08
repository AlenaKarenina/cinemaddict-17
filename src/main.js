import {render, RenderPosition} from './render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/main-navigation-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';

import FilmsPresenter from './presenter/main-films-presenter.js';

import MovieModel from './model/movie-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const containerFilmsPresenter = new FilmsPresenter;
const movieModel = new MovieModel();

render(new ProfileView, pageHeader);
render(new NavigationView, pageMain, RenderPosition.BEFOREEND);
render(new FilterView, pageMain, RenderPosition.BEFOREEND);
render(new FooterStatisticsView, pageFooter, RenderPosition.BEFOREEND);

containerFilmsPresenter.init(pageMain, movieModel);
