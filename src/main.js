import {render} from './framework/render.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MovieModel from './model/movie-model.js';
import FilterModel from './model/filter-model.js';
import FilmsApiService from './films-api-service.js';
import {AUTHORIZATION, END_POINT} from './const.js';

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const movieModel = new MovieModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, movieModel, filterModel);
const filterPresenter = new FilterPresenter(pageMain, filterModel, movieModel);

filterPresenter.init();
containerFilmsPresenter.init();

movieModel.init()
  .finally(() => {
    render(new ProfileView, pageHeader);
    render(new FooterStatisticsView(movieModel.count), pageFooter);
  });
