import React from 'react';
import Square from './Square';

const Board = ({
  squares,
  setSquares,
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  numberSelected,
}) => {
  return (
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
          numberSelected={numberSelected}
        />
      ))}
    </div>
  );
};

export default Board;
