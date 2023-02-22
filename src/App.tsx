import React from 'react';
import sassLogo from './sassLogo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={sassLogo} className="App-logo" alt="sass-logo" />
        <p>
          Global Sass Variables
        </p>
      </header>
    </div>
  );
}

export default App;
