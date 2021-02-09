import React, {useState} from 'react';

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

type Tile = {
  inspected: boolean
  bomb: boolean
  neighbors: number
}

const updateNeighbors = (x: number, y: number, board: Tile[][]) => {
  const boardWidth = board[0].length - 1;
  const boardLength = board.length - 1;
  if (y >= 1) {
    x >= 1 && board[y - 1][x - 1].neighbors++;
    board[y - 1][x].neighbors++;
    x < boardWidth && board[y - 1][x + 1].neighbors++;
  }
  x >= 1 && board[y][x - 1].neighbors++;
  x < boardWidth && board[y][x + 1].neighbors++;
  if (y < boardLength) {
    x >= 1 && board[y + 1][x - 1].neighbors++;
    board[y + 1][x].neighbors++;
    x < boardWidth && board[y + 1][x + 1].neighbors++;
  }
}

const generateMap = (width: number, height: number, numMines: number) => {
  const board: Tile[][] = Array(height).fill(null).map(
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
        updateNeighbors(x, y, board);
      }
      remainingSquares -= 1;
    }
  }
  return board;
}


const Board = ({width = 40, height = 20, numMines = 25 }) => {

  const [mineMap, updateMineMap] = useState(generateMap(width, height, numMines));
  return (
    <div>
      {mineMap.map((row, y) => (
        <div>
          {row.map((tile, x) => (<span style={{ display: 'inline-block', width: '20px', height: '28px' }} key={`${x}${y}`}>{tile.bomb ? 'X' : tile.neighbors}</span>))}
        </div>
      ))}
    </div>
  )
}

export default Board;