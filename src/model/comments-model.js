import {generateComment} from '../mock/comments-template.js';

export default class CommentsModel {
  #comments = Array.from({length: 50}, generateComment);

  get comments() {
    return this.#comments;
  }

  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);
}
