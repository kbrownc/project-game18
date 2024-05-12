import React, { useState } from 'react';
import SelectNumber from './Select';
import Board from './Board';
import { alphabet } from '../letters/Alphabet';
import { wordDictionary2 } from '../letters/WordDictionary2';
import { wordDictionary3 } from '../letters/WordDictionary3';
import { wordDictionary4 } from '../letters/WordDictionary4';
import { wordDictionary5 } from '../letters/WordDictionary5';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  const [selectNumber, setSelectNumber] = useState(false);
  const [wordNo, setWordNo] = useState(1);
  const [numberSelected, setNumberSelected] = useState('');
  const [squares, setSquares] = useState([]);
  const [wordLengths, setWordLengths] = useState([]);
  const [remainingAlphabet, setRemainingAlphabet] = useState(alphabet);
  const [errorMessage, setErrorMessage] = useState('');
  const [score, setScore] = useState(0);
  const [allValid, setAllValid] = useState(false);

  const restart = () => {
    setSelectNumber(false);
    setNumberSelected('');
    setWordLengths([]);
    setSquares([]);
    setWordNo(1);
    setErrorMessage('');
    setRemainingAlphabet(alphabet);
    setScore(0);
    console.clear();
  };

  const handleClick = () => {
    // which squares contain 1's,2's,3's,.....
    let wordN;
    let result = '';
    let words = [];
    for (let i = 1; i < wordNo + 1; i++) {
      wordN = [];
      for (let j = 0; j < squares.length; j++) {
        wordN = squares.filter(event => {
          if (event.wordNums.length === 1) {
            if (event.wordNums[0] === i) {
              return true;
            } else {
              return false;
            }
          } else if (event.wordNums.length === 2) {
            if (event.wordNums[0] === i || event.wordNums[1] === i) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
      }
      // combine words from board
      result = '';
      for (let k = 0; k < wordN.length; k++) {
        result = result + wordN[k].letter;
      }
      words.push(result);
    }
    verifyBoard(words);
  };

  // Calculate total value of words plus Bonus
  function calculateScore(words) {
    let workScore = 20 - numberSelected;
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        workScore =
          workScore +
          letterPoints.find(item => {
            return item.letter === words[i][j].toUpperCase();
          }).point;
      }
    }
    return workScore;
  }

  function verifyBoard(words) {
    let workErrorMessage = '';
    // Are all squares filled in?
    for (let j = 0; j < squares.length; j++) {
      if (squares[j].letter === '') {
        workErrorMessage = 'Fill in all squares';
        setErrorMessage(workErrorMessage);
        return;
      }
    }
    // are all words real words
    let workAllValid = true;
    let invalidWord = '';
    for (let j = 0; j < words.length; j++) {
      if (validWord(words[j]) === false) {
        workAllValid = false;
        invalidWord = words[j];
        break;
      }
    }
    if (!workAllValid) {
      workErrorMessage = invalidWord + ' is not valid';
    } else {
      workErrorMessage = 'You win!!!';
      setScore(calculateScore(words));
    }
    setErrorMessage(workErrorMessage);
    setAllValid(workAllValid)
  }

  function validWord(word) {
    let wordDictionary = [];
    if (word.length === 2) {
      wordDictionary = wordDictionary2;
    } else if (word.length === 3) {
      wordDictionary = wordDictionary3;
    } else if (word.length === 3) {
      wordDictionary = wordDictionary4;
    } else if (word.length === 4) {
      wordDictionary = wordDictionary4;
    } else {
      wordDictionary = wordDictionary5;
    }
    const found = wordDictionary.find(item => {
      return item === word.toLowerCase();
    });
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <h1 className="game-title">Dyna-crosswords</h1>
      <span className="score"> Score: {score}</span>
      <div className={(allValid) ? "msgValid" : "msgErr"}>{errorMessage}</div>
      {!selectNumber ? (
        <div>
          <SelectNumber
            numberSelected={numberSelected}
            setNumberSelected={setNumberSelected}
            setSelectNumber={setSelectNumber}
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
            onClick={handleClick}
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            numberSelected={numberSelected}
          />
          <button className="restart" onClick={() => handleClick()}>
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
          <div>Number of Letters remaining: {numberSelected - (32 - remainingAlphabet.length)}</div>
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
