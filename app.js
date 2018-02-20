
// Link in the Inquirer Package
var inquirer = require('inquirer');

// Link the list of random words
var guessWordList = require('./wordList.js');

// Link in the word tester
var checkForLetter = require('./word.js');

// Link in the letters to display
var Letters = require('./letter.js');


// Global Variables
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;


// Hangman Game Object
var game = {

    wordBank: guessWordList, // import a list of words
    guessesRemaining: 10, // per word
    currentWrd: null, // the word object


    startGame: function () {
        // make sure the user has 10 guesses
        this.guessesRemaining = 10;

        // get a random word from the array
        var randomWord = Math.floor(Math.random() * this.wordBank.length);
        this.currentWrd = this.wordBank[randomWord];

        // Inform User game has begun
        console.log('Guess the country name');

        // Show the empty letters ( _ _ _ _ ) and guesses, etc.
        displayHangman = new Letters(this.currentWrd);
        displayHangman.display();
        console.log('Guesses Left: ' + game.guessesRemaining);

        // prompt for a letter
        promptLetter();
    }

};


// User Prompt Function
function promptLetter() {

    // Always make a gap between inputs
    console.log('');

    // If enough guesses left, then prompt for new letter
    if (game.guessesRemaining > 0) {
        inquirer.prompt([
            {
                type: "value",
                name: "letter",
                message: "Guess a Letter: "
            }
        ]).then(function (userInput) {

            // Collect Letter Input
            var inputLetter = userInput.letter.toLowerCase();

            // Valid input
            if (alphabet.indexOf(inputLetter) == -1) {

                // Tell user they did not guess a letter
                console.log('Sorry, "' + inputLetter + '" is not a letter. Try again!');
                console.log('Guesses Left: ' + game.guessesRemaining);
                console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                promptLetter();

            }
            else if (alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1) {

                // Tell user they already guessed that letter
                console.log('You already guessed "' + inputLetter + '". Try again!');
                console.log('Guesses Left: ' + game.guessesRemaining);
                console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                promptLetter();

            }
            else {

                // Remove the entry from the list of possible inputs
                lettersAlreadyGuessed.push(inputLetter);


                // Check for the letter in the word
                var letterInWord = checkForLetter(inputLetter, game.currentWrd);

                // If the letter is in the word, update the letter object
                if (letterInWord) {

                    // Add to correct letters list
                    lettersCorrectlyGuessed.push(inputLetter);

                    // Show the empty letters ( _ _ _ _ ) and guesses, etc.
                    displayHangman = new Letters(game.currentWrd, lettersCorrectlyGuessed);
                    displayHangman.display();


                    // Test if the user has won
                    if (displayHangman.winner) {
                        console.log('You win! Congrats!');
                        // continueGame();
                        // return;
                    }
                    // Not a win yet, so ask for another input and decrement guesses
                    else {
                        console.log('Guesses Left: ' + game.guessesRemaining);
                        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                        promptLetter();
                    }

                }
                // Otherwise, decrement guesses and re-prompt the old hangman object
                else {
                    game.guessesRemaining--;

                    displayHangman.display();
                    console.log('Guesses Left: ' + game.guessesRemaining);
                    console.log('Letters already guessed: ' + lettersAlreadyGuessed);
                    promptLetter();
                }

            }

        });

    }
    // If not enough guesses left, then user losses
    else {
        console.log('You lost. Try again. The word was "' + game.currentWrd + '".');
        // continueGame();
    }

}


// Function to determine if user wants to continue game or not
// function continueGame() {

//     inquirer.prompt([

//         {
//             type: "list",
//             name: "option",
//             message: "Do you want to continue the game?",
//             choices: ["Yes", "No"]

//         }

//     ]).then(function (userInput) {
        

//     });
// }

// Create a new game object using the constructor and begin playing
game.startGame();