import React, { useState } from 'react';
import SelectNumber from './Select';
import Board from './Board';
import { alphabet } from '../letters/Alphabet';
import { letterPoints } from '../letters/LetterPoints';
import { validWord, getWords} from '../utils';

function App() {
  const [showBoard, setShowBoard] = useState(false);
  const [wordNo, setWordNo] = useState(1);
  const [maxNumberConsonants, setMaxNumberConsonants] = useState('');
  const [squares, setSquares] = useState([]);
  const [wordLengths, setWordLengths] = useState([]);
  const [remainingAlphabet, setRemainingAlphabet] = useState(alphabet);
  const [errorMessage, setErrorMessage] = useState('');
  const [score, setScore] = useState(0);
  const [msgColorRed, setMsgColorRed] = useState(true);
  let game;
  let invalidWord = '';
  const totalNumberOfConsonants = 27;

  class Game {
    restart() {
      setShowBoard(false);
      setMaxNumberConsonants('');
      setWordLengths([]);
      setSquares([]);
      setWordNo(1);
      setErrorMessage('');
      setRemainingAlphabet(alphabet);
      setScore(0);
      setMsgColorRed(true);
      console.clear();
    }
    calculateScore(words) {
      // assign bonus points based on max Number Consonants selected
      let workScore = 20 - maxNumberConsonants;
      words.forEach(value => {
        value.split("").forEach(char => {
          workScore =
            workScore +
            letterPoints.find(item => {
              return item.letter === char.toUpperCase();
            }).point;
        })
      })
      return workScore;
    }
  }
  game = new Game();

  const handleDoneClick = () => {
    let words = [];
    getWords(words,wordNo,squares)
    verifyBoard(words);
  };

  function checkWords(words) {
    return !words.some(item => {
      invalidWord = item;
      return validWord(item) === false;
    });
  }

  function verifyBoard(words) {
    let workErrorMessage = '';
    // Are all squares filled in?
    if (
      squares.some(item => {
        return item.letter === '';
      })
    ) {
      workErrorMessage = 'Fill in all squares';
    }

    // are all words real words
    if (workErrorMessage === '') {
      if (!checkWords(words)) {
        setMsgColorRed(true);
        workErrorMessage = invalidWord + ' is not valid';
      } else {
        workErrorMessage = 'You win!!!';
        setMsgColorRed(false);
        setScore(game.calculateScore(words));
      }
    }
    setErrorMessage(workErrorMessage);
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
            squares={squares}
            setSquares={setSquares}
            wordNo={wordNo}
            setWordNo={setWordNo}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : (
        <div>
          <Board
            squares={squares}
            setSquares={setSquares}
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            maxNumberConsonants={maxNumberConsonants}
            score={score}
          />
          <button className="restart" onClick={() => handleDoneClick()}>
            Done
          </button>
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
        <button className="restart" onClick={() => game.restart()}>
          Restart
        </button>
      </div>
    </>
  );
}

export default App;
