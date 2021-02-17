import { TileT } from '../types';

type funcT = (x: number, y: number, board: TileT[][]) => void

const applyToNeighbors = (func: funcT): funcT => {
  return (x: number, y: number, board: TileT[][]): void => {
    const boardWidth = board[0].length - 1;
    const boardLength = board.length - 1;
    if (y >= 1) {
      x >= 1 && func(x - 1, y - 1, board);
      func(x, y - 1, board);
      x < boardWidth && func(x + 1, y - 1, board);
    }
    x >= 1 && func(x - 1, y, board);
    x < boardWidth && func(x + 1, y, board);
    if (y < boardLength) {
      x >= 1 && func(x - 1, y + 1, board);
      func(x, y + 1, board);
      x < boardWidth && func(x + 1, y + 1, board);
    }
  };
}

export default applyToNeighbors;