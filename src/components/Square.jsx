import React from 'react';

const Square = ({
  i,
  squares,
  setSquares,
  remainingAlphabet,
  setRemainingAlphabet,
  errorMessage,
  setErrorMessage,
  maxNumberConsonants,
}) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const totalNumberOfConsonants = 27;
  
  const editInput = e => {
    const newSquares = JSON.parse(JSON.stringify(squares));
    const workRemainingAlphabet = JSON.parse(JSON.stringify(remainingAlphabet));
    let newLetter = e.target.value.replace(/[^a-z]/gi, '').toUpperCase();
    
    // Check to see if you have reached the extent of your letter useage
    let workErrorMessage = '';
    if (
      maxNumberConsonants < totalNumberOfConsonants - remainingAlphabet.length + 1 &&
      vowels.indexOf(newLetter) === -1
    ) {
      workRemainingAlphabet.push('');
      workErrorMessage = 'You have reached the extent of your letter useage... please start over';
      newLetter = '';
    }
    setErrorMessage(workErrorMessage);
    // Ensure input is a letter and if it is save it
    // Ensure letter is available. If not generate ab error message
    if (
      workRemainingAlphabet.indexOf(e.target.value.toUpperCase()) === -1 &&
      e.target.value !== '' &&
      workErrorMessage === '' &&
      vowels.indexOf(newLetter) === -1
    ) {
      workRemainingAlphabet.push('');
      workErrorMessage = 'Letter is not available';
      newLetter = '';
    }
    setErrorMessage(workErrorMessage);
    // Add letter to available list if removed
    if (
      newSquares[i].letter !== '' &&
      e.target.value === '' &&
      vowels.indexOf(newSquares[i].letter) === -1
    ) {
      workRemainingAlphabet.push(newSquares[i].letter);
    }
    // if letter entered was not '' and was not a vowel, remove it from alphabet list
    if (newLetter !== '') {
      if (vowels.indexOf(newLetter) === -1) {
        workRemainingAlphabet.splice(workRemainingAlphabet.indexOf(newLetter), 1);
      }
    }
    // save state
    newSquares[i].letter = newLetter;
    setSquares(newSquares);
    setRemainingAlphabet(workRemainingAlphabet);
  };

  return (
    <div className="cell" style={{ gridRow: squares[i].locationRow, gridColumn: squares[i].locationCol }}>
      <input
        required
        name="cell+square"
        className="yellowsquares"
        type="text"
        value={squares[i].letter}
        maxLength="1"
        onChange={editInput}
      />
    </div>
  );
};

export default Square;
