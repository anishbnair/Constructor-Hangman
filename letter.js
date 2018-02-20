
// letter.js will control whether or not a letter appears as a "_" or as itself on-screen.

// Letters Constructor
function Letters(word, goodGuesses) {

    this.gameWord = word;
    this.goodLetters = goodGuesses;
    this.displayText = '';

    // By Defualt, we start as winner is false (to aviod a premature win)
    this.winner = false;

    // Function to display hangman word to user
    this.display = function () {

        // Show the user the hangman word
        var placeholderWord = '';

        // If no goodGuesses yet then single For Loop
        if (this.goodLetters === undefined) {
            for (var i = 0; i < this.gameWord.length; i++) {
                // If not the letter
                placeholderWord += ' _ ';
            }
        }
        // Otherwise, check all letters in a double loop
        else {

            // Loop through the word itself and then each possible correct letter.
            for (var i = 0; i < this.gameWord.length; i++) {

                // To determine whether a _ is needed
                var letterFound = false;

                for (var j = 0; j < this.goodLetters.length; j++) {
                    // If yes the letter
                    if (this.gameWord[i] === this.goodLetters[j]) {
                        placeholderWord += this.goodLetters[j];
                        letterFound = true;
                    }
                }
                // If nothing was found
                if (!letterFound) {
                    placeholderWord += ' _ ';
                }
            }
        }

        // Remove first/last space and console log
        this.displayText = placeholderWord.trim();
        console.log(this.displayText);

        // Check to see if the game was won (user display equals the word; ie no '_' marks)
        if (this.displayText == this.gameWord) {
            this.winner = true;
        }

    }

}


// export to use in word.js
module.exports = Letters;


