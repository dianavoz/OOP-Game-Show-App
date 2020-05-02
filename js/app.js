/*app.js to create a new instance of the `Game` class and add event listeners for the start
button and onscreen keyboard buttons.*/

const game = new Game();

// When the 'Start Game' button is clicked
document.getElementById('btn__reset').addEventListener('click', () => {
	game.resetDisplay();
	game.startGame();
	console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);
});

// When a player selects a letter
const markButton = (button) => {
	// Disable the button on the onscreen keyboard
	button.disabled = true;
	game.handleInteraction(button);
};

// If a button is clicked
document.getElementById('qwerty').addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		markButton(event.target);
	}
});

/* Add keyboard functionality
 When a key is pressed */
let keyButton = document.querySelectorAll('#qwerty button');
window.addEventListener('keypress', (event) => {
	if (/^[a-zA-Z]+$/.test(event.key)) {
		for (let i in keyButton) {
			if (keyButton[i].textContent === event.key && keyButton[i].disabled === false) {
				markButton(keyButton[i]);
			}
		}
	}
});