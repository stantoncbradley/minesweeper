import applyToNeighbors from './applyToNeighbors';
import { TileT } from '../types';

const inspectNeighbors = applyToNeighbors((x: number, y: number, board: TileT[][]) => {
  const tile = board[y][x];
  if (tile.inspected) return;
  tile.inspected = true;
  if (tile.neighbors === 0) {
    inspectNeighbors(x, y, board);
  }
});

export default inspectNeighbors;