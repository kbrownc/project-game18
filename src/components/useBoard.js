import { getRandomNumber, loadCell, switchCell } from '../utils';

const useBoard = (squares, wordLengths, wordNo, setWordNo) => {
  // create an empty board
  let workSquares = JSON.parse(JSON.stringify(squares));
  let posY = 1;
  let workWordNo = wordNo;
  let posX = 1;
  let alignment = 'row';
  let randomNumber;
  // outer loop runs through selected word lengths
  for (let i = 0; i < wordLengths.length; i++) {
    // check to see if you have made the largest board possible yet
    if (alignment === 'row' && posX + wordLengths[i] > 9) {
      break;
    } else if (alignment === 'column' && posY + wordLengths[i] > 9) {
      break;
    }
    // inner loop processes each letter in a word
    randomNumber = getRandomNumber(1, 2);
    let doubleWord = false;
    for (let x = 1; x < wordLengths[i]; x++) {
      // check if letter is used in 2 words
      if ((x === 1 && i !== 0) || (x === 1 && posX !== 1)) {
        doubleWord = true;
      } else {
        doubleWord = false;
      }
      workSquares = loadCell(posX, posY, workSquares, doubleWord, workWordNo);
      if (alignment === 'row') {
        posX++;
      } else {
        posY++;
      }
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
    if (alignment === 'row') {
      alignment = 'column';
    } else {
      alignment = 'row';
    }
    // if room still exists for another word, start processing word lengths at the beginning
    if (alignment === 'row' && posX + wordLengths[0] < 9 && i + 1 === wordLengths.length) {
      i = -1;
    } else if (alignment === 'column' && posY + wordLengths[0] < 9 && i + 1 === wordLengths.length) {
      i = -1;
    }
    // increment word counter
    workWordNo++;
  }
  // Push out last letter of last word
  workWordNo--;
  workSquares = loadCell(posX, posY, workSquares, false, workWordNo);
  return [workSquares,workWordNo];
};

export default useBoard;
