import getRandomInt from './getRandomInt';
import applyToNeighbors from './applyToNeighbors';
import { TileT } from '../types';

const getNeighborVal = applyToNeighbors((x: number, y: number, board: TileT[][]) => board[y][x].neighbors += 1);

const getMine = (remainingSquares: number, remainingMines: number) => {
  if (remainingMines === 0) return false;
  return getRandomInt(0, remainingSquares) <= remainingMines;
};

const generateMap = (width: number, height: number, numMines: number) => {
  const board: TileT[][] = Array(height).fill(null).map(
    () => Array(width).fill(null).map(() => ({
      inspected: false,
      bomb: false,
      neighbors: 0
    }))
  );

  // randomly fill board with mines
  // tally neighbor mine count
  let remainingMines = numMines;
  let remainingSquares = width * height;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const tile = board[y][x];
      tile.bomb = getMine(remainingSquares, remainingMines);
      if (tile.bomb) {
        remainingMines -= 1;
        getNeighborVal(x, y, board);
      }
      remainingSquares -= 1;
    }
  }
  return board;
}

export default generateMap;