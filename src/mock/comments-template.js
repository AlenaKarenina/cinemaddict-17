import {getRandomInteger} from '../utils.js';

const commentEmotion = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

export const generateComment = () => ({
  'id': getRandomInteger(1, 5),
  'author': 'Ilya O Reilly',
  'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': `${commentEmotion[getRandomInteger(0, commentEmotion.length-1)]}`
});
