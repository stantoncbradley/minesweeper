import React from 'react';
import { TileT } from './types';

type TilePropsT = {
  tile: TileT
  onClick: (x: number, y: number) => void
  x: number,
  y: number
}

const Tile = ({ tile, onClick, x, y }: TilePropsT) => {
  return (
    <span
      style={{
        display: 'inline-block',
          width: '20px',
          height: '28px'
        }}
        onClick={() => onClick(x, y)}
    >
      {tile.inspected ? tile.bomb ? 'X' : tile.neighbors : '?'}
    </span>
  )
};

export default Tile;