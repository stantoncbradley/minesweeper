import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to MineSweeper. Grab a broom.
        </p>
      </header>
      <Board />
    </div>
  );
}

export default App;
