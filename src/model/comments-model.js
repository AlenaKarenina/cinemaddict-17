import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import MovieModel from './movie-model.js';

export default class CommentsModel extends Observable {

  #commentsApiService = null;
  #movieId = null;
  #comments = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (movieId) => {
    this.#movieId = movieId;

    try {
      this.#comments = await this.#commentsApiService.getComments(this.#movieId);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };

  addComment = async (updateType, update, movie) => {
    try {
      const response = await this.#commentsApiService.addComment(update, movie.id);
      this.#comments = response.comments;

      const updatedComments = {
        ...MovieModel.adaptToClient(response.movie),
        comments: this.#comments
      };

      this._notify(updateType, updatedComments);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, id) => {

    if (id === null) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(id);

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

}
