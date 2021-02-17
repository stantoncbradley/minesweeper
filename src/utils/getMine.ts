import getRandomInt from './getRandomInt';

const getMine = (remainingSquares: number, remainingMines: number) => {
  if (remainingMines === 0) return false;
  return getRandomInt(0, remainingSquares) <= remainingMines;
};

export default getMine;