import Observable from '../framework/observable.js';
import {UpdateType, UserAction} from '../const.js';

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

  addComment = async (newComment, movieId) => {
    try {
      const response = await this.#commentsApiService.addComment(newComment, movieId);
      this.#comments = response.comments;
      this._notify(UserAction.ADD_COMMENT);
    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (commentId) => {
    //const index = this.#comments.findIndex((comment) => comment.id === commentId.id);

    if (commentId === null) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentId);

      /*this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];*/

      this._notify(UserAction.DELETE_COMMENT);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

}
