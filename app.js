// Selects the qwerty and phrase elements in the HTML
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');

// Used to keep track of the number of guesses the player has missed.
// If the player guesses wrong 5 times, they lose the game
let missed = 0;

// Selects the button with the class .btn__reset in the HTML
const button = document.querySelector('.btn__reset');

// Adds an event listener that listens for a click.
// If clicked, the display property of the element is set to none
button.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
});

// An array that contains 5 different phrases as strings for a player to try to guess
const phrases = [
    "a banana is yellow",
    "an orange is orange",
    "redbull gives you wings",
    "coffee tastes good",
    "coding is fun"
];

// Function that returns a random phrase from the phrases array as an array of characters
function getRandomPhraseAsArray(arr) {
    const randomString = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomString];
    const chars = randomPhrase.split("");
    return chars;
}

// Calls the getRandomPhraseAsArray function and assigns the returned array to the phraseArray variable
const phraseArray = getRandomPhraseAsArray(phrases);

// Function that adds the letters of a string to the display as list items
function addPhraseToDisplay(arr) {

    const ul = document.querySelector('#phrase ul');

    for (let i = 0; i < phraseArray.length; i++) {

        const li = document.createElement("li");
        li.textContent = arr[i];

        // Checks if the current character is a letter or a space
        if (/[a-zA-Z]/.test(phraseArray[i]) && phraseArray[i].trim() !== "") {
            li.className = "letter";
        } else {
            li.className = "space";
        }

        ul.appendChild(li);

    }


}

// Calls the addPhraseToDisplay function with the phraseArray as the argument
addPhraseToDisplay(phraseArray);

// Adds an event listener to the qwerty element that listens for a click on a button
qwerty.addEventListener('click', (event) => {
    const button = event.target;

    // Checks if the clicked element is a button
    if (button.tagName === 'BUTTON') {
        const letterFound = button.textContent;
        const keyPressed = button.textContent;

        // Checks if the clicked button's text content is a letter and it hasn't been clicked before
        if (/^[a-z]$/i.test(keyPressed) && !button.classList.contains('chosen')) {
            button.classList.add('chosen');
            checkLetter(keyPressed);
        }

    }

    // Function that checks if the letter in the button clicked matches any of the letters in the phrase
    function checkLetter(letter) {
        const phraseLetters = document.querySelectorAll(".letter");
        let matchingLetter = null;

        for (let i = 0; i < phraseLetters.length; i++) {
            if (phraseLetters[i].textContent.toLowerCase() === letter.toLowerCase()) {
                phraseLetters[i].classList.add('show');
                matchingLetter = phraseLetters[i].textContent;
            } else {
            }
        }

        // If the clicked letter is not in the phrase, the player misses a guess
        if (matchingLetter === null) {
            missed++;
            const images = document.querySelectorAll('.tries');
            const index = missed - 1;

            if (index >= 0 && index < images.length) {
                images[index].firstElementChild.src = "images/lostHeart.png"

            }
        }

        return matchingLetter;
    }


    /*  The checkWin() function checks whether the player has won or lost a game by comparing the number of revealed letters to the total number of letters in the phrase.
        If the player has won, it displays a congratulatory message on an overlay. If the player has lost, it displays a losing message on the same overlay.
        the missed variable is declared at the beginning of this entire script.
    */
    function checkWin() {
        const phraseLetters = document.querySelectorAll(".letter");
        const shownLetters = document.querySelectorAll('.show');
        if (phraseLetters.length === shownLetters.length) {
            const overlay = document.querySelector('#overlay');
            overlay.style.display = "flex";
            overlay.classList.add('win')
            overlay.textContent = 'You won! Congratulations on your victory!'
        } else if (missed >= 5) {
            const overlay = document.querySelector('#overlay');
            overlay.style.display = "flex";
            overlay.classList.add('lose')
            overlay.textContent = 'Unfortunately you lost. Better luck next time!'
        }
    }

    checkWin();

});

