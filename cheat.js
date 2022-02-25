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
let secretNumber;
let responseYesNo;
let pivot;
let playAgain;
let flag = true;

//Create "while" loop function using binary search algorithm
async function guessNum() { 
    console.log('Please think of a number between 1 and 100 (inclusive).');
    console.log('I will try to guess it.')
    secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
    pivot = Math.round((max - min)/2);
    while (flag) {
      responseYesNo = await ask('Is it ...' + pivot + ' ? ');
      if (responseYesNo.includes('Y', 'y', 'Yes', 'yes')) {
          console.log('Your number was' + " " + pivot + '!');
// Ask player if s/he wants to play again
          playAgain = await ask("Do you want to play again?\n");
            if (playAgain.includes('Y', 'y', 'Yes', 'yes')) {
              min = 1;
              max = 100;
              guessNum();  
            } else {
              flag = false;
            }
      } else {
          let responseHighLow = await ask('Is it higher (H) or lower (L)? ');
          if (responseHighLow.includes('H', 'h', 'Higher', 'higher')) {
            min = pivot + 1;
            pivot = pivot + Math.round((max - (min - 1))/2);
          } else {
            max = pivot - 1;
            pivot = pivot - Math.round(((max + 1) - min)/2);      
          }
          let previousResponse = responseHighLow;
      }
    } 
  process.exit();
}

guessNum();

/*
if (secretNumber > previousResponse && responseHighLow.includes('H', 'h', 'Higher', 'higher')) {
  min = pivot + 1;
  pivot = pivot + Math.round((max - (min - 1))/2);
} else if (secretNumber < responseHighLow && responseHighLow.includes('L', 'l', 'Lower', 'lower')){
  max = pivot - 1;
  pivot = pivot - Math.round(((max + 1) - min)/2);      
} else if (secretNumber < responseHighLow && previousResponse.includes('H', 'h', 'Higher', 'higher')) {
  console.log("You said it was higher than " + pivot, " so it can't also be lower than " + min + "!");
} else if (secretNumber > responseHighLow && previousResponse.includes('L', 'l', 'Lower', 'lower')) {
  console.log("You said it was lower than " + pivot, " so it can't also be higher than " + max + "!");
*/