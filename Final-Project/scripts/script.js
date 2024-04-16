const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Function to fetch a random word and its definition from the Words API
async function getRandomWordAndDefinition() {
    const randomWordUrl = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '62038f01d3msha25b29fbfe95026p1c8db4jsnf051ffdc84c5',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    try {
        let randomWord, definitionData;

        // Fetch random word until we get one without spaces
        do {
            // Fetch random word
            const randomWordResponse = await fetch(randomWordUrl, options);
            const randomWordData = await randomWordResponse.json();
            //console.log(randomWordData);
            randomWord = randomWordData.word;

            // Check if the random word contains only alphabetical letters
            if (!randomWord.match(/^[a-zA-Z]+$/)) {
                continue; 
            }

            // Fetch definition for the random word
            const definitionUrl = `https://wordsapiv1.p.rapidapi.com/words/${encodeURIComponent(randomWord)}/definitions`;
            const definitionResponse = await fetch(definitionUrl, options);
            definitionData = await definitionResponse.json();
        } while (!definitionData || !definitionData.definitions || definitionData.definitions.length === 0);

        // Extract definition
        const definitionsArray = definitionData.definitions.map(item => item.definition);
        const definitions = definitionsArray.join('; ') || "No definition found.";

        console.log('Random word:', randomWord);
        console.log('Random word definition:', definitions);
        
        return { word: randomWord, definition: definitions };
        
    } catch (error) {
        console.error('Error fetching random word or definition:', error);
        return null;
    }
}

// Initializing game variables
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;
let remainingTime = 40; // Initial time in seconds
let countdownInterval;

// Function to start the countdown timer
const startCountdown = () => {
    let timeLeft = 40; // 40 seconds countdown
    updateCountdown(timeLeft); // Initial display of countdown

    // Update countdown every second
    countdownInterval = setInterval(() => {
        timeLeft--;
        updateCountdown(timeLeft);

        // If time is up, end the game
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            gameOver(false); // End the game with failure
        }
    }, 1000);
};

// Function to update the countdown display
const updateCountdown = (timeLeft) => {
    const countdownDisplay = document.querySelector('.countdown');
    if (countdownDisplay) {
        countdownDisplay.textContent = timeLeft;
        // Update countdown style for visual effect (you can adjust this according to your preference)
        countdownDisplay.style.transform = `scale(${1 + (40 - timeLeft) / 40})`;
        countdownDisplay.style.opacity = `${timeLeft / 40}`;
    }
    const countdownMessage = document.querySelector('.countdown-message p');
    if (countdownMessage) {
        countdownMessage.textContent = `Time remaining to guess the word: ${timeLeft} seconds`;
    }
};


// Reset function
const resetGame = async () => {
    // Clear any existing timer and interval
    clearInterval(countdownInterval);

    // Resetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    currentWord = ""; // Clear the currentWord variable
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    remainingTime = 40; // Reset remaining time
    
    // Clear word display before adding blanks for the new word
    wordDisplay.innerHTML = ""; 
    
    clearInterval(countdownInterval);
    // Get a new word
    await getRandomWord();

    // Log currentWord length for debugging
    console.log("Current word length:", currentWord.length);
    
    // Add blank spaces for each alphabetic character or space in the current word
    for (let i = 0; i < currentWord.length; i++) {
        const char = currentWord[i];
        if (char.match(/[a-zA-Z\s]/)) { // Check if the character is alphabetic or a space
            const blank = document.createElement("li");
            blank.classList.add("letter");
            blank.innerText = "_";
            wordDisplay.appendChild(blank);
        } else if (char === " ") { // Check if the character is a space
            const blankSpace = document.createElement("li");
            blankSpace.classList.add("letter");
            wordDisplay.appendChild(blankSpace);
        }
    }
    
    // Log the number of blanks added to wordDisplay
    console.log("Number of blanks added:", wordDisplay.querySelectorAll(".letter").length);
    
    // Enable all keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    // Start the countdown timer
    startCountdown();
    
    // Hide the game modal if it's visible
    gameModal.classList.remove("show");
    
    // Reset word position (if needed)
    wordPosition = 0;
};

const getRandomWord = async () => {
    const wordData = await getRandomWordAndDefinition();
    if (wordData) {
        currentWord = wordData.word;
        const hint = wordData.definition; // Set hint to the definition
        document.querySelector(".hint-text b").innerText = hint;
    }
};

const gameOver = (isVictory) => {
    // After game complete, show modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

    clearInterval(countdownInterval);
};

// Update the initGame function to create the correct number of <li> elements
let wordPosition = 0;

const initGame = (button, clickedLetter) => {
    
    if (currentWord.includes(clickedLetter)) {
        // If the clicked letter is in the current word
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                // Update the display to show the guessed letter in correct positions
                wordDisplay.querySelectorAll(".letter").forEach((blank, idx) => {
                    if (currentWord[idx] === clickedLetter) {
                        blank.innerText = clickedLetter; // Display the guessed letter
                        blank.classList.add("guessed");
                    }
                });
            }
        });
    } else {
        // If the clicked letter is not in the current word
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true; // Disable the clicked button
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; // Update guesses text

    if (wrongGuessCount === maxGuesses) return gameOver(false); // Check if the game is over
    if (correctLetters.length === currentWord.length) return gameOver(true); // Check if the word is complete
};

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i);
    button.innerText = letter.toUpperCase(); // Display uppercase letter
    button.dataset.letter = letter; // Set data-letter attribute
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, letter));
}
// Function to handle keyboard input
const handleKeyboardInput = (event) => {
    const keyPressed = event.key.toLowerCase();
    // Check if the key pressed is a letter and has not been guessed yet
    if (keyPressed.match(/[a-z]/) && !correctLetters.includes(keyPressed)) {
        const button = keyboardDiv.querySelector(`button[data-letter="${keyPressed}"]`);
        if (button) {
            initGame(button, keyPressed);
        }
    }
};

// Add event listener to capture keydown events
document.addEventListener("keydown", handleKeyboardInput);
// Call resetGame function to start the game
resetGame();
// Adding event listener to play again button
playAgainBtn.addEventListener("click", resetGame);