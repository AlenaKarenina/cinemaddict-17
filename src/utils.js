import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDueDate = (dueDate) => dayjs(dueDate).format('YYYY');

export {getRandomInteger, humanizeDueDate};
