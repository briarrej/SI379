const timeDisplay = document.querySelector('#time-display'); // Displays the time
const startButton = document.querySelector('#start-button'); // Starts the timer
const pauseButton = document.querySelector('#pause-button'); // Pauses the timer
const resetButton = document.querySelector('#reset-button'); // Resets the timer
let startingPoint = Date.now();
let timeElapsed = 0
/**
 * Update the content in the #time-display element to reflect the current time
 * @param {*} value Time in milliseconds
 */
function updateDisplay(value) {
    timeDisplay.innerText = (value/1000).toFixed(0);
   // Date.now(); //date.now() can't be used with a DOM element 
}

const updateTime = () => { //gets called every second 
    updateDisplay(Date.now() - startingPoint);
    setTimeout(updateTime,1000);
}

startButton.addEventListener('click', ()=>{
    startingPoint = Date.now(); //if startingPoint was defined here, the variable is only visible within curly braces
    updateTime()
    startButton.setAttribute('disabled', 'true') // problem set 2
})
i

//updateTime()
//updateDisplay(Date.now())