import React, { useState } from 'react';
import Tile from './Tile';
import generateMap from './utils/generateMap';
import inspectNeighbors from './utils/inspectNeighbors';

const Board = ({width = 40, height = 20, numMines = 100 }) => {
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