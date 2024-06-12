import React, { useState } from 'react';
import Square from './Square';
import useBoard from './useBoard';
import { validWord, getWords, calculateScore } from '../utils';

const Board = ({
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  maxNumberConsonants,
  setMsgColorRed,
  wordLengths,
}) => {
  const [score, setScore] = useState(0);
  const [squares, setSquares, wordNo, addLetter] = useBoard(wordLengths);
  let invalidWord = '';

  const handleDoneClick = () => {
    let words = getWords(wordNo, squares);
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
        setScore(calculateScore(words, maxNumberConsonants));
      }
    }
    setErrorMessage(workErrorMessage);
  }

  return (
    <div>
      <div className="score"> Score: {score}</div>
      <div className="board">
        {squares.map((square, i) => (
          <Square
            key={i}
            i={i}
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            setErrorMessage={setErrorMessage}
            maxNumberConsonants={maxNumberConsonants}
            wordLengths={wordLengths}
            squares={squares}
            setSquares={setSquares}
            addLetter={addLetter}
          />
        ))}
      </div>
      <button className="restart" onClick={() => handleDoneClick()}>
        Done
      </button>
    </div>
  );
};

export default Board;
