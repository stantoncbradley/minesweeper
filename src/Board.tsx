import React, { useState } from 'react';
import Tile from './Tile';
import { TileT } from './types';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getMine = (remainingSquares: number, remainingMines: number) => {
  if (remainingMines === 0) return false;
  return getRandomInt(0, remainingSquares) <= remainingMines;
};

const applyToNeighbors = (func: (tile: TileT) => void): (x: number, y: number, board: TileT[][]) => void => {
  return (x: number, y: number, board: TileT[][]): void => {
    const boardWidth = board[0].length - 1;
    const boardLength = board.length - 1;
    if (y >= 1) {
      x >= 1 && func(board[y - 1][x - 1]);
      func(board[y - 1][x]);
      x < boardWidth && func(board[y - 1][x + 1]);
    }
    x >= 1 && func(board[y][x - 1]);
    x < boardWidth && func(board[y][x + 1]);
    if (y < boardLength) {
      x >= 1 && func(board[y + 1][x - 1]);
      func(board[y + 1][x]);
      x < boardWidth && func(board[y + 1][x + 1]);
    }
  };
}

const getNeighborVal = applyToNeighbors((tile: TileT) => tile.neighbors += 1);
const inspectNeighbors = applyToNeighbors((tile: TileT) => { tile.inspected = true; });

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


const Board = ({width = 40, height = 20, numMines = 25 }) => {
  const [mineMap, setMineMap] = useState(generateMap(width, height, numMines));
  const [lost, setLost] = useState(false);

  const onClick = (x: number, y: number) => {
    const newMap = [...mineMap.map(row => [...row])];
    const tile = newMap[y][x];
    if (tile.bomb) {
      setLost(true);
      return;
    }
    if (tile.neighbors === 0) {
      inspectNeighbors(x, y, newMap);
    }
    tile.inspected = true;
    setMineMap(newMap);
  }

  return (
    <div>
      {mineMap.map((row, y) => (
        <div>
          {row.map((tile, x) => <Tile tile={tile} key={`${x}${y}`} onClick={onClick} x={x} y={y} />)}
        </div>
      ))}
    </div>
  )
}

export default Board;