import ApiService from './framework/api-service.js';
import {Method} from './const.js';

export default class CommentsApiService extends ApiService {
  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse);
  }

  addComment = async (comment, movieId) => {
    const response = await this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (id) => {
    const response = await this._load({
      url: `comments/${id}`,
      method: Method.DELETE,
    });

    return response;
  };
}
