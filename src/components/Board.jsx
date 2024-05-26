import React from 'react';
import Square from './Square';

const Board = ({
  squares,
  setSquares,
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  maxNumberConsonants,
  score,
}) => {
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
    </div>
  );
};

export default Board;
