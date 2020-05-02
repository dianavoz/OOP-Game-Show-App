/*Phrase.js to create a Phrase class to handle the creation of phrases.*/

class Phrase {
	// Accepts a phrase
	constructor(phrase) {
		this.phrase = phrase;
	}

	// Adds letter placeholders to the display when the game starts
	addPhraseToDisplay() {
		// Spread the phrase into individual characters
		const splitCharacters = this.phrase.split('');

		// Iterate over the characters array
		splitCharacters.forEach(letter => {
			let li = document.createElement('li');
			li.textContent = letter;

			// If the character is a space, add the class 'hide space'
			letter === ' ' ? li.className = 'space' : li.className = `hide letter ${letter}`;

			//append li to the #phrase ul
			document.querySelector('#phrase ul').appendChild(li);
		});
	}

	// Checks to see if letter selected by player matches a letter in the phrase
	checkLetter(letter) {
		return !!this.phrase.match(letter);
	}

	// Reveals the letter on the board that matches player's selection
	showMatchedLetter(letter) {
		const htmlLetters = document.querySelectorAll('#phrase .letter');
		// Loops over each character element from the board
		htmlLetters.forEach(element => {
			if (element.textContent === letter) {
				element.classList = 'show letter';
			}
		});
	}

}