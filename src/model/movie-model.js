import {genetateMovieCard} from '../mock/movie-template.js';
import {generateComment} from '../mock/comments-template.js';

export default class MovieModel{
  movie = Array.from({length: 20}, genetateMovieCard);
  getMovie = () => this.movie;

  comments = Array.from({length: 20}, generateComment);
  getComment = () => this.comments;
}
