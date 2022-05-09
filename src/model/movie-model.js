import {genetateMovieCard} from '../mock/movie-template.js';
import {generateComment} from '../mock/comments-template.js';

const CARD_COUNT = 20;
const COMMENT_COUNT = 20;

export default class MovieModel {
  #movie = Array.from({length: CARD_COUNT}, genetateMovieCard);
  get movie() { return this.#movie; }

  #comments = Array.from({length: COMMENT_COUNT}, generateComment);
  get comments() { return this.#comments; }
}
