import { wordDictionary2 } from './letters/WordDictionary2';
import { wordDictionary3 } from './letters/WordDictionary3';
import { wordDictionary4 } from './letters/WordDictionary4';
import { wordDictionary5 } from './letters/WordDictionary5';

  // Look in correct dictionary to see if word exists
  function validWord(word) {
    let wordDictionArray = [wordDictionary2, wordDictionary3, wordDictionary4, wordDictionary5];
    let wordDictionary = wordDictionArray[word.length - 2];
    return !!wordDictionary.find(item => {
      return item === word.toLowerCase();
    });
  }

  // get words from board and put them into an array
  function getWords(words,wordNo,squares) {
    // the squares which contain 1's,2's,3's,..... etc. defines each word
    let wordN;
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
      words.push(result);
    }
  }
  
  export { validWord, getWords };
