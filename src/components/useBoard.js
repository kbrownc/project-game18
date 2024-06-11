import { useState, useEffect } from 'react';
import { getRandomNumber, loadCell, switchCell, notVowel } from '../utils';
import { totalNumberOfConsonants } from '../constants';

const useBoard = wordLengths => {
  // create an empty board
  const [squares, setSquares] = useState([]);
  const [wordNo, setWordNo] = useState(1);

  useEffect(() => {
    let workSquares = JSON.parse(JSON.stringify(squares));
    let posY = 1;
    let workWordNo = wordNo;
    let posX = 1;
    let alignment = 'row';
    let randomNumber;
    // outer loop runs through selected word lengths
    for (let i = 0; i < wordLengths.length; i++) {
      // check to see if you have made the largest board possible yet
      if (
        (alignment === 'row' && posX + wordLengths[i] > 9) ||
        (alignment === 'column' && posY + wordLengths[i] > 9)
      ) {
        break;
      }
      // inner loop processes each letter in a word
      randomNumber = getRandomNumber(1, 2);
      let doubleWord = false;
      for (let x = 1; x < wordLengths[i]; x++) {
        // check if letter is used in 2 words
        doubleWord = (x === 1 && i !== 0) || (x === 1 && posX !== 1);
        workSquares = loadCell(posX, posY, workSquares, doubleWord, workWordNo);
        alignment === 'row' ? posX++ : posY++;
        // randomly adjust if you build the next word on the current word's last or 2nd last letter
        //      row/1st letter of new word is last letter of previous/ 4 or 5 letter word/not 1st word
        if (alignment === 'row' && x === 1 && wordLengths[i - 1] > 2 && i > 0 && wordLengths[i] !== 2) {
          if (randomNumber === 1) {
            posY--;
            workSquares = switchCell(workSquares);
          }
        } else if (
          alignment === 'column' &&
          x === 1 &&
          wordLengths[i - 1] > 2 &&
          i > 0 &&
          wordLengths[i] !== 2
        ) {
          if (randomNumber === 1) {
            posX--;
            workSquares = switchCell(workSquares);
          }
        }
      }
      // switch direction of next word
      alignment = alignment === 'row' ? 'column' : 'row';
      // if room still exists for another word, start processing word lengths at the beginning
      if (
        (alignment === 'row' && posX + wordLengths[0] < 9 && i + 1 === wordLengths.length) ||
        (alignment === 'column' && posY + wordLengths[0] < 9 && i + 1 === wordLengths.length)
      ) {
        i = -1;
      }
      // increment word counter
      workWordNo++;
    }
    // Push out last letter of last word
    workWordNo--;
    workSquares = loadCell(posX, posY, workSquares, false, workWordNo);
    setSquares(workSquares);
    setWordNo(workWordNo);
  }, []);

  const addLetter = (
    e,
    i,
    remainingAlphabet,
    setRemainingAlphabet,
    setErrorMessage,
    maxNumberConsonants,
    wordLengths
  ) => {

    const newSquares = JSON.parse(JSON.stringify(squares));
    const workRemainingAlphabet = JSON.parse(JSON.stringify(remainingAlphabet));
    let newLetter = e.target.value.replace(/[^a-z]/gi, '').toUpperCase();

    // Check to see if you have reached the extent of your letter useage
    let workErrorMessage = '';
    if (maxNumberConsonants < totalNumberOfConsonants - remainingAlphabet.length + 1 && notVowel(newLetter)) {
      workErrorMessage = 'You have reached the extent of your letter useage... please start over';
      newLetter = '';
    }

    // Ensure input is a letter and available for selection
    if (
      workRemainingAlphabet.indexOf(e.target.value.toUpperCase()) === -1 &&
      e.target.value !== '' &&
      workErrorMessage === '' &&
      notVowel(newLetter)
    ) {
      workErrorMessage = 'Letter is not available';
      newLetter = '';
    }
    setErrorMessage(workErrorMessage);
    // Add letter to available list if removed
    if (newSquares[i].letter !== '' && e.target.value === '' && notVowel(newSquares[i].letter)) {
      workRemainingAlphabet.push(newSquares[i].letter);
    }
    // if letter entered was not '' and was not a vowel, remove it from alphabet list
    if (newLetter !== '') {
      if (notVowel(newLetter)) {
        workRemainingAlphabet.splice(workRemainingAlphabet.indexOf(newLetter), 1);
      }
    }
    // save state
    newSquares[i].letter = newLetter;
    setSquares(newSquares);
    setRemainingAlphabet(workRemainingAlphabet);
  };

  return [squares, setSquares, wordNo, addLetter];
};

export default useBoard;
