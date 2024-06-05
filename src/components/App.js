import React, { useState } from 'react';
import SelectNumber from './Select';
import Board from './Board';
import { alphabet } from '../letters/Alphabet';

function App() {
  const [showBoard, setShowBoard] = useState(false);
  const [maxNumberConsonants, setMaxNumberConsonants] = useState('');
  const [wordLengths, setWordLengths] = useState([]);
  const [remainingAlphabet, setRemainingAlphabet] = useState(alphabet);
  const [errorMessage, setErrorMessage] = useState('');
  const [msgColorRed, setMsgColorRed] = useState(true);
  const totalNumberOfConsonants = 27;
 
  const restart = () => {
      setShowBoard(false);
      setMaxNumberConsonants('');
      setWordLengths([]);
      setErrorMessage('');
      setRemainingAlphabet(alphabet);
      setMsgColorRed(true);
      console.clear();
  }

  return (
    <>
      <h1 className="game-title">Dyna-crosswords</h1>
      <div className={!msgColorRed ? 'msgValid' : 'msgErr'}>{errorMessage}</div>
      <br />
      {!showBoard ? (
        <div>
          <SelectNumber
            maxNumberConsonants={maxNumberConsonants}
            setMaxNumberConsonants={setMaxNumberConsonants}
            setShowBoard={setShowBoard}
            wordLengths={wordLengths}
            setWordLengths={setWordLengths}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : (
        <div>
          <Board
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            maxNumberConsonants={maxNumberConsonants}
            setMsgColorRed={setMsgColorRed}
            wordLengths={wordLengths}
          />
        </div>
      )}
      <div className="info-wrapper">
        <p className="alphabet">{remainingAlphabet} </p>
        <div className="info-parms">
          <div>
            Word lengths selected:
            {wordLengths.map((lth, i) => lth + ' ')}
          </div>
          <div>
            Number of Letters remaining:{' '}
            {maxNumberConsonants - (totalNumberOfConsonants - remainingAlphabet.length)}
          </div>
        </div>
        <br />
        <button className="restart" onClick={() => restart()}>
          Restart
        </button>
      </div>
    </>
  );
}

export default App;
