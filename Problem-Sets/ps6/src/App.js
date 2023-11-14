import Slider from './Slider';
import './App.css'
import React from "react";

const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));
  const[guessRed, setGuessRed] = React.useState(getRandomIntegerBetween(MIN, MAX)); //guessRed is their guess, setGuess changes their guess
  const[guessBlue, setGuessBlue] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const[guessGreen, setGuessGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [cheatingMode, setCheatingMode] = React.useState(false);
  const [showingFeedback, setShowingFeedback] = React.useState(false);
  const doGuess = React.useCallback(() => {
    setShowingFeedback(true);
  }, []);
  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);

  const showUserGuess = cheatingMode || showingFeedback;
  const doAdvance = React.useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setShowingFeedback(false);
  }, []);

  return (
    <div className="App">
      <p id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onChange={onChangeCheatingMode} /></p>
       <p><strong>Guess the color of the rectangle </strong></p>
      <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      <div>{showUserGuess && <div id="user-guess"   style={{backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`}} /> }
        </div>
      
       <div id="color-picker">
        {!showingFeedback && 
        <div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${guessRed/MAX})`  }}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={guessRed} onChange={r => setGuessRed(r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${guessGreen/MAX})`}}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={guessGreen} onChange={g => setGuessGreen(g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={guessBlue} onChange={b => setGuessBlue(b)} />
        </div>
        </div>}
        
        {showingFeedback && <p>Your guess: {guessRed}, {guessBlue}, {guessGreen}. Actual: <strong>{red}, {blue}, {green}</strong></p> }
        {!showingFeedback && <button onClick={doGuess}>Guess</button> }
        {showingFeedback && <button onClick={doAdvance}>Next</button>}
        
      </div>
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}