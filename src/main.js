import {render} from './framework/render.js';
import ProfileView from './view/profile-view.js';
import FilterView from './view/filter-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MovieModel from './model/movie-model.js';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0,
  },
];

const pageHeader = document.querySelector('.header');
const pageMain = document.querySelector('.main');
const pageFooter = document.querySelector('.footer');

const movieModel = new MovieModel();
const filterModel = new FilterModel();
const containerFilmsPresenter = new FilmsPresenter(pageMain, movieModel);

render(new ProfileView, pageHeader);
render(new FilterView(filters, 'all'), pageMain);

render(new FooterStatisticsView(movieModel.count), pageFooter);

containerFilmsPresenter.init();
