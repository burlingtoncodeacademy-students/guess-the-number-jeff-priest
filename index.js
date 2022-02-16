//Include boilerplate code for creating Promise
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

async function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Create variables
let min = 1;
let max = 100;
let flag = true;

//Create initial prompt to user
console.log('Please think of a number between 1 and 100 (inclusive).');
console.log('I will try to guess it.')

//Create "while" loop function to hone in on selected number
async function guessNum() { 
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  let pivot = Math.round((max - min)/2);
  while (flag) {
      let responseYesNo = await ask('Is it ...' + pivot + " " + '(Y or N)? ');
      if (responseYesNo === 'Y') {
          console.log('Your number was' + " " + pivot + '!');
          flag = false;
      } else {
          let responseHighLow = await ask('Is it higher (H) or lower (L)? ');
          if (responseHighLow === 'H') {
              min = pivot + 1;
              pivot = pivot + Math.round((max - (min - 1))/2);
          } else {
              max = pivot - 1;
              pivot = pivot - Math.round(((max + 1) - min)/2);      
          }
      }
  }
}
guessNum();