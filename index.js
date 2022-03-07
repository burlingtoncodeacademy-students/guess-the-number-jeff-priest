// Include boilerplate code for creating Promise
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

async function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Create variables
let min = 1;
let max = 100;
let secretNumber;
let responseYesNo;
let responseHighLow;
let pivot;
let error;
let playAgain;
let flag = true;
let count = 0;

// Function to generate a random number between min and max
function randomNum(min, max) {
    let range = max - min + 1
    return Math.floor(Math.random() * range) + min
}

// Function to play guess the number game using random number generator
async function guessRandom() { 
  // Create initial prompt to user
  console.log('Please think of a number between 1 and 100 (inclusive).');
  console.log('I will try to guess it.')
  secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  while (flag) {
    count++;
    let randomGuess = randomNum(min,max);
    responseYesNo = await ask('Is it ...' + randomGuess + " " + '(Y or N)? ');
      if (responseYesNo.includes('Y') || responseYesNo.includes('y') || responseYesNo.includes('Yes') || responseYesNo.includes('yes')) {
          console.log('Your number was' + " " + randomGuess + '!');
          console.log('It took ' + count + ' guesses for the computer to identify the correct number.');
          playAgain = await ask("Do you want to play again?\n");
          if (playAgain.includes('Y') || playAgain.includes('y') || playAgain.includes('Yes') || playAgain.includes('yes')) {
            min = 1;
            max = 100;
            guessRandom();  
          } else {
            flag = false;
          }
      } else if (responseYesNo.includes('N') || responseYesNo.includes('n') || responseYesNo.includes('No') || responseYesNo.includes('no')) {
          responseHighLow = await ask('Is it higher (H) or lower (L)? ');
          if (responseHighLow.includes('H') || responseHighLow.includes('h') || responseHighLow.includes('Higher') || responseHighLow.includes('higher')) {
              min = randomGuess + 1;
          } else if (responseHighLow.includes('L') || responseHighLow.includes('l') || responseHighLow.includes('Lower') || responseHighLow.includes('lower')) {
              max = randomGuess - 1;      
          }
      }
    }
  process.exit();
}

// Function to play guess the number game using binary search algorithm
async function guessNum() { 
  // Create initial prompt to user
  console.log('Please think of a number between 1 and 100 (inclusive).');
  console.log('I will try to guess it.')
  secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  // Create pivot
  pivot = Math.round((max - min)/2);
  // Loop: If the computer guesses correctly, the computer receives feedback and is asked if it wants to play again
  while (flag) {
    count++;
    responseYesNo = await ask('Is it ...' + pivot + ' ? ');
    if (responseYesNo.includes('Y') || responseYesNo.includes('y') || responseYesNo.includes('Yes') || responseYesNo.includes('yes')) {
      console.log('Your number was' + " " + pivot + '!');
      console.log('It took ' + count + ' guesses for the computer to identify the correct number.');
      playAgain = await ask("Do you want to play again?\n");
        if (playAgain.includes('Y') || playAgain.includes('y') || playAgain.includes('Yes') || playAgain.includes('yes')) {
          min = 1;
          max = 100;
          guessNum();  
        } else {
          flag = false;
        }
    // If the computer does not guess correctly, the user must indicate if the actual number is higher or lower than the guess
    // The pivot is recalculated based on the response
    // If the user tries to cheat by indicating the wrong direction (i.e., higher or lower) between the guessed
    // number and the actual number, the computer "complains"
    } else if (responseYesNo.includes('N') || responseYesNo.includes('n') || responseYesNo.includes('No') || responseYesNo.includes('no')) {
      responseHighLow = await ask('Is it higher (H) or lower (L)? ');
        if (secretNumber > pivot && (responseHighLow.includes('H') || responseHighLow.includes('h') || responseHighLow.includes('Higher') || responseHighLow.includes('higher'))) {
          min = pivot + 1;
          pivot = pivot + Math.round((max - (min - 1))/2);
          error = pivot + 1;
        } else if (secretNumber < pivot && (responseHighLow.includes('L') || responseHighLow.includes('l') || responseHighLow.includes('Lower') || responseHighLow.includes('lower'))) {
          max = pivot - 1;
          pivot = pivot - Math.round(((max + 1) - min)/2);   
          error = pivot - 1;   
        } else if (secretNumber < pivot && (responseHighLow.includes('H') || responseHighLow.includes('h') || responseHighLow.includes('Higher') || responseHighLow.includes('higher'))) {
          console.log("You said it was higher than " + pivot + ", so it can't also be lower than " + error + "!");
        } else if (secretNumber > pivot && (responseHighLow.includes('L') || responseHighLow.includes('l') || responseHighLow.includes('Lower') || responseHighLow.includes('lower'))) {
          console.log("You said it was lower than " + pivot + ", so it can't also be higher than " + error + "!")
        }
      }
    }
  process.exit();
}

// Extend the Guess Range

// Function to extend the guess range
async function extendRange() {
  //Ask user to provide maximum of range, ask for secret number, and create pivot
  let maxRange = await ask("What is the highest number of the range within which you would like me to guess?\n");
  console.log('Please think of a number between 1 and' + " " + maxRange + " " + '(inclusive).');
  console.log('I will try to guess it.');
  secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  let pivot = Math.round((maxRange - min)/2);
  
  // Loop: If computer guesses number correctly, the computer receives feedback
  // If the computer guess incorrecty, the user must indicate if the actual number is higher or lower, and
  // the pivot is recalculated
  while (flag) {
    responseYesNo = await ask('Is it ...' + pivot + " " + '(Y or N)? ');
      if (responseYesNo.includes('Y') || responseYesNo.includes('y') || responseYesNo.includes('Yes') || responseYesNo.includes('yes')) {
        console.log('Your number was' + " " + pivot + '!');
        playAgain = await ask("Do you want to play again?\n");
        if (playAgain.includes('Y') || playAgain.includes('y') || playAgain.includes('Yes') || playAgain.includes('yes')) {
          min = 1;
          extendRange();  
        } else {
          flag = false;
        }
      } else if (responseYesNo.includes('N') || responseYesNo.includes('n') || responseYesNo.includes('No') || responseYesNo.includes('no')) {
        let responseHighLow = await ask('Is it higher (H) or lower (L)? ');
        if (responseHighLow.includes('H') || responseHighLow.includes('h') || responseHighLow.includes('Higher') || responseHighLow.includes('higher')) {
          min = pivot + 1;
          pivot = pivot + Math.round((maxRange - (min - 1))/2);
        } else if (responseHighLow.includes('L') || responseHighLow.includes('l') || responseHighLow.includes('Lower') || responseHighLow.includes('lower')) {
          maxRange = pivot - 1;
          pivot = pivot - Math.round(((maxRange + 1) - min)/2);      
        }
      }
  }
  process.exit();
}

// Role Reversal game

//Function to play role reversal game
async function roleReversal() {
  // Select random number between 1 and 100
  secretNumber = randomNum(min, max);
  // Create initial prompt to user
  console.log('I am thinking of a number between 1 and 100 (inclusive).');
  console.log('Please try to guess it.');
  // Loop: If guessed number is lower than actual number, game tells user the number is higher
  // If guessed number is higher than actual number, game tells user the number is lower
  // When the number is correctly guessed, the user receives feedback and is asked if s/he wants to play again
  while (flag) {
    let guessNum = await ask("What is the number?\n");
      if (guessNum < secretNumber) {
        console.log('The number is higher.');
        } else if (guessNum > secretNumber) {
        console.log('The number is lower.');
        } else {
        console.log('Correct! The number was' + " " + guessNum + '!');
        playAgain = await ask("Do you want to play again?\n");
          if (playAgain.includes('Y') || playAgain.includes('y') || playAgain.includes('Yes') || playAgain.includes('yes')) {
            min = 1;
            max = 100;
            roleReversal();  
          } else {
          flag = false;
          }
        }
  }
  process.exit();
}

// Function to pick the normal game or role reversal game
// If normal game is selected, ask if the user wants the computer to guess using randomly generated numbers or 
// binary search algorithm
async function pickGame() {
  let chooseGame = await ask("Welcome to guess-the-number!\nWould you like to play the normal game or reverse game?\nType normal or reverse.\n")
  if (chooseGame.includes('normal') || chooseGame.includes('Normal')) {
    let rangeChoice = await ask("The game typically involves a number between 1 and 100. Would you like to change the maximum number?\n");
      if (rangeChoice.includes('Yes') || rangeChoice.includes('yes') || rangeChoice.includes('Y') || rangeChoice.includes('y')) {
        extendRange();
      } else if (rangeChoice.includes('No') || rangeChoice.includes('no') || rangeChoice.includes('N') || rangeChoice.includes('n')) {
          let gameType = await ask("Would you like to play using randomly generated guesses or a binary search algorithm?\nType random or binary.\n")
            if (gameType.includes('random') || gameType.includes('Random')) {
              guessRandom();
            } else if (gameType.includes('binary') || gameType.includes('Binary')) {
              guessNum();
            }
        }
  } else if (chooseGame.includes('reverse') || chooseGame.includes('Reverse')) {
      roleReversal();
  }
}

pickGame();