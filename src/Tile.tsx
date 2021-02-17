import React from 'react';
import { TileT } from './types';

type TilePropsT = {
  tile: TileT
  onClick: (x: number, y: number) => void
  x: number,
  y: number
}

const getFontColor = (tile: TileT) => {
  switch (tile.neighbors) {
    case 0: return 'lightgrey';
    case 1: return 'blue';
    case 2: return 'green';
    case 3: return 'red';
    case 4: return 'purple';
    default: return 'darkblue';
  }
}

const baseStyle = {
  display: 'inline-flex',
  minWidth: '20px',
  minHeight: '28px',
  flexDirecction: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '0.5px',
  borderStyle: 'solid'
};

const Tile = ({ tile, onClick, x, y }: TilePropsT) => {
  if (!tile.inspected) {
    return (
      <span
        style={{
          ...baseStyle,
          backgroundColor: '#BBB',
          borderColor: '#666',
          color: '#BBB',
          cursor: 'pointer'
        }}
        onClick={() => onClick(x, y)}
      >?</span>
    );
  }
  return (
    <span
      style={{
        ...baseStyle,
        color: getFontColor(tile),
        borderColor: 'white',
      }}  
    >
      {tile.bomb ? '💣' : tile.neighbors}
    </span>
  )
};

export default Tile;