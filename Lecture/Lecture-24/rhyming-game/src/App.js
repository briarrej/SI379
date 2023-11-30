import React from 'react';
import logo from './logo.svg';
import './App.css';

async function getRhymingWords(word) {
  const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}`);
  const data = await response.json();
  return data;
  };

async function getSimilarWords(word) {
  const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await response.json();
  return data;
  };



function App() {

  const inputRef = React.useRef(); //
  const onSubmit = React.useCallback(async () => {
    const rhymingWords = await getRhymingWords(inputRef.current.value);
    console.log(rhymingWords);

    const similarWords = await getSimilarWords(inputRef.current.value);
    console.log(similarWords);
    }, [inputRef]);


return (
  <div className="App">
    <input type="text" ref={inputRef} />
    <button onClick={onSubmit}>Go</button>
  </div>
);
}


export default App;
