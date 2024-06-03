import React, { useState } from 'react';
import Square from './Square';
import useBoard from './useBoard';
import { validWord, getWords, calculateScore} from '../utils';

const Board = ({
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  maxNumberConsonants,
  setMsgColorRed,
  wordLengths,
}) => {
  const [squares, setSquares] = useState([]);
  const [wordNo, setWordNo] = useState(1);
  const [score, setScore] = useState(0);

  const [workSquares, workWordNo] = useBoard(squares,wordLengths,wordNo,setWordNo);
  let invalidWord = '';
  //setSquares(workSquares)
  //setWordNo(workWordNo  )

  const handleDoneClick = () => {
    let words = getWords(wordNo,squares)
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
        setScore(calculateScore(words,maxNumberConsonants));
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
            squares={squares}
            setSquares={setSquares}
            remainingAlphabet={remainingAlphabet}
            setRemainingAlphabet={setRemainingAlphabet}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            maxNumberConsonants={maxNumberConsonants}
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
