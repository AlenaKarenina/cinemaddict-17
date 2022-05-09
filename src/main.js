import {render} from './render.js';
import ProfileView from './view/profile-view.js';
import NavigationView from './view/main-navigation-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const movieModel = new MovieModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, movieModel);

render(new ProfileView, pageHeader);
render(new NavigationView, pageMain);
render(new FooterStatisticsView, pageFooter);

containerFilmsPresenter.init();
