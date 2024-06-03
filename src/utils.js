import { wordDictionary2 } from './letters/WordDictionary2';
import { wordDictionary3 } from './letters/WordDictionary3';
import { wordDictionary4 } from './letters/WordDictionary4';
import { wordDictionary5 } from './letters/WordDictionary5';
import { letterPoints } from './letters/LetterPoints';

  // Look in correct dictionary to see if word exists
  function validWord(word) {
    let wordDictionArray = [wordDictionary2, wordDictionary3, wordDictionary4, wordDictionary5];
    let wordDictionary = wordDictionArray[word.length - 2];
    return !!wordDictionary.find(item => {
      return item === word.toLowerCase();
    });
  }

  // get words from board and put them into an array
  function getWords(wordNo,squares) {
    // the squares which contain 1's,2's,3's,..... etc. defines each word
    let wordN;
    let wordsList =[];
    let result = '';
    for (let i = 1; i < wordNo + 1; i++) {
      wordN = [];
      for (let j = 0; j < squares.length; j++) {
        wordN = squares.filter(event => {
          if (event.wordNums.length === 1) {
            return event.wordNums[0] === i;
          } else if (event.wordNums.length === 2) {
            return event.wordNums[0] === i || event.wordNums[1] === i;
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
      wordsList.push(result);
    }
    return wordsList
  }

  const getRandomNumber = (start, end) => {
    let random = Math.floor(Math.random() * end + start);
    while (random > end) {
      random = Math.floor(Math.random() * end + start);
    }
    return random;
  };

  const loadCell = (x, y, workSquares, doubleWord, workWordNo) => {
    let newSquare = {};
    let wordNums = [workWordNo];
    if (doubleWord) {
      wordNums = [workWordNo, workWordNo - 1];
    }
    newSquare = {
      letter: '',
      locationCol: x + ' / ' + (x + 1),
      locationRow: y + ' / ' + (y + 1),
      wordNums: wordNums,
    };
    workSquares.push(newSquare);
    return workSquares;
  };

  const switchCell = workSquares => {
    let savedLetter = workSquares[workSquares.length - 2].letter;
    let savedWordNums = workSquares[workSquares.length - 2].wordNums;
    workSquares[workSquares.length - 2].letter = workSquares[workSquares.length - 1].letter;
    workSquares[workSquares.length - 2].wordNums = workSquares[workSquares.length - 1].wordNums;
    workSquares[workSquares.length - 1].letter = savedLetter;
    workSquares[workSquares.length - 1].wordNums = savedWordNums;
    return workSquares;
  };

  const calculateScore = (words,maxNumberConsonants) => {
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

  export { validWord, getWords, getRandomNumber, loadCell, switchCell, calculateScore };
