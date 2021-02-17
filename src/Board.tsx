import React, { useState } from 'react';
import Tile from './Tile';
import generateMap from './utils/generateMap';
import inspectNeighbors from './utils/inspectNeighbors';

export enum GameState {
  New = "NEW",
  InProgress = "IN_PROGRESS",
  Won = "WON",
  Lost = "LOST"
}

const Board = ({width = 40, height = 20, numMines = 100 }) => {
  const [mineMap, setMineMap] = useState(generateMap(width, height, numMines));
  const [gameState, setGameState] = useState(GameState.New);

  const onClick = (x: number, y: number) => {
    const newMap = [...mineMap.map(row => [...row])];
    const tile = newMap[y][x];
    tile.inspected = true;
    if (tile.bomb) {
      setGameState(GameState.Lost);
      setMineMap(newMap);
      return;
    }
    if (tile.neighbors === 0) {
      inspectNeighbors(x, y, newMap);
    }
    setMineMap(newMap);
  }

  const onSecondaryClick = () => {}

  return (
    <div>
      {mineMap.map((row, y) => (
        <div>
          {row.map((tile, x) => (
            <Tile
              tile={tile}
              key={`${x}${y}`}
              onClick={onClick}
              onSecondaryClick={onSecondaryClick}
              gameState={gameState}
              x={x}
              y={y}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board;