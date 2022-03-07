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

function randomNum(min, max) {
    let range = max - min + 1
    return Math.floor(Math.random() * range) + min
  }

let secretNumber = randomNum(min, max);

//Create initial prompt to user
console.log('I am thinking of a number between 1 and 100 (inclusive).');
console.log('Please try to guess it.');

//Create "while" loop function
async function roleReversal() {
  while (flag) {
    let guessNum = await ask("What is the number?\n");
      if (guessNum < secretNumber) {
        console.log('The number is higher.');
        } else if (guessNum > secretNumber) {
        console.log('The number is lower.');
        } else {
        console.log('Correct! The number was' + " " + guessNum + '!');
        flag = false;
        /*playAgain();*/
        }
    }
  process.exit();
}
/*
async function playAgain() {
  let playAgain = await ask("Do you want to play again?\n");
    if (playAgain.includes('Y', 'y', 'Yes', 'yes')) {
      secretNumber = randomNum(min,max);
      console.log('I am thinking of a number between 1 and 100 (inclusive).');
      console.log('Please try to guess it.');
      roleReversal(); 
    } else {
      process.exit();
    }
}
*/
roleReversal();