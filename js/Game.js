/*Game.js to create a Game class methods for starting and ending the game, handling
interactions, getting a random phrase, checking for a win, and removing a life from the
scoreboard.*/

class Game {
	constructor() {
		// The number of missed guesses by the player
		this.missed = 5;
		this.activePhrase = null;
		// An array of phrases to use with the game
		this.phrases = [
			'no story',
			'Begin',
			'Let go',
			'Let it be',
			'Slow down',
			'Breathe',
			'Go for it'
		];
	}

	// Get a random phrase from the phrases array
	getRandomPhrase() {
		return this.phrases[Math.floor(Math.random() * this.phrases.length)].toLocaleLowerCase();
	}

	// Start the game
	startGame() {
		// Create a new instance of the Phrase class
		this.activePhrase = new Phrase(this.getRandomPhrase());
		// Add the random phrase to the board
		this.activePhrase.addPhraseToDisplay();
	}

	/* Checks to see if the player has selected all of the letters
	If there are the same number of shown letters as letters on the board, then the player wins*/
	checkForWin() {
		let hiddenLis = document.querySelectorAll(".hide");
		if (hiddenLis.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	// Removes a life
	removeLife() {
		this.missed--;

		// Hide the heart
		document.getElementsByTagName('img')[this.missed].className = 'hidden';

		// If the player has 5 missed guesses, call gameOver()
		if (this.missed === 0) {
			this.gameOver(false);
		}
	}

	// Show success or failure screen
	gameMessage(message, overlayClass) {
		const overlay = document.getElementById('overlay');
		overlay.className = overlayClass;
		overlay.style.display = 'flex';
		document.getElementById('game-over-message').innerHTML = message;
		document.getElementById('btn__reset').textContent = 'Play again!';
	}

	// Displays a message if the player wins or a different message if they lose
	gameOver(gameWon) {
		if (gameWon) {
			this.gameMessage('You win!', 'win');
		} else {
			this.gameMessage('Bummer :( Try again!', 'lose');
		}
	}

	// Resets the display
	resetDisplay() {

		this.activePhrase = null;
		this.missed = 5;
		document.getElementById('overlay').style.display = 'none';

		const key = document.querySelectorAll('.key');
		key.forEach(element => {
			element.className = "key";
			element.removeAttribute("disabled");
			element.classList.remove('wrong');
			element.classList.remove('chosen');
		});

		// Reset the board
		const phraseUl = document.querySelector("ul");
		phraseUl.innerHTML = "";

		// Reset the hearts
		const hiddenHearts = document.querySelectorAll('.hidden');
		hiddenHearts.forEach(heart => heart.className = 'tries');
	}

	// Checks to see if the letter selected by the player matches a letter in the phrase
	handleInteraction(letter) {

		const matchLetter = this.activePhrase.checkLetter(letter.textContent);

		// If the selected letter matches
		if (matchLetter) {
			letter.className += 'chosen';
			this.activePhrase.showMatchedLetter(letter.textContent);
			const win = this.checkForWin();

			if (win) {
				this.gameOver(true);
			}

		} else {
			letter.className += ' wrong';
			this.removeLife();
		}
	}
}