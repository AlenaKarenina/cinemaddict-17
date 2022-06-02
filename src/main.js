import {render} from './framework/render.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MovieModel from './model/movie-model.js';
import FilterModel from './model/filter-model.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const movieModel = new MovieModel();
const filterModel = new FilterModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, movieModel);
const filterPresenter = new FilterPresenter(pageMain, filterModel, movieModel);

render(new ProfileView, pageHeader);

render(new FooterStatisticsView(movieModel.count), pageFooter);

filterPresenter.init();
containerFilmsPresenter.init();
