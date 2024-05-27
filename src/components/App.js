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
      let workScore = 20 - maxNumberConsonants;
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
  }
  game = new Game();

  const handleDoneClick = () => {
    // which squares contain 1's,2's,3's,.....
    let wordN;
    let result = '';
    let words = [];
    for (let i = 1; i < wordNo + 1; i++) {
      wordN = [];
      for (let j = 0; j < squares.length; j++) {
        wordN = squares.filter(event => {
          if (event.wordNums.length === 1) {
            return event.wordNums[0] === i
          } else if (event.wordNums.length === 2) {
            return event.wordNums[0] === i || event.wordNums[1] === i
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

  function checkWords(words) {
    if (
      words.some(item => {
        invalidWord = item;
        return validWord(item) === false;
      })
    ) {
      return false;
    } else {
      return true;
    }
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

  // Look in correct dictionary to see if word exists
  function validWord(word) {
    let wordDictionArray = [wordDictionary2, wordDictionary3, wordDictionary4, wordDictionary5];
    let wordDictionary = wordDictionArray[word.length - 2];
    return !!wordDictionary.find(item => {
      return item === word.toLowerCase();
    });
    // const found = wordDictionary.find(item => {
    //   return item === word.toLowerCase();
    // });
    // return found !== undefined
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
