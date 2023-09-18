let score = 0;
//id is a string and we need a DOM element 
for(const id of getAllHoleIds()) {
    let id_DOM = document.querySelector('#'+ id)
    id_DOM.addEventListener('click', () => {
         //     1. Remove the "needs-whack" class
    //          2. Add the "animating-whack" class *for 500 milliseconds*
        if (id_DOM.classList.contains('needs-whack')){
            id_DOM.classList.remove('needs-whack');
            id_DOM.classList.add('animating-whack');
            setTimeout(() => {
                id_DOM.classList.remove('animating-whack')
            }, 500);
    // 3. Increment the score by 1 (and update the score display)
            score++;
            let scores = document.querySelector('#score');
            scores.innerText = 'Score: ' + score;
        }
     //        4. If the score is 45 or higher, stop the game (by clearing the interval)    
        if (score >= 45){
            clearInterval(interval);
        }
    })

    // Write code that adds a "click" listener to the element with this id
    //     When the user clicks on it, *if* the element has class "needs-whack" then:
    //          1. Remove the "needs-whack" class
    //          2. Add the "animating-whack" class *for 500 milliseconds*
    //          3. Increment the score by 1 (and update the score display)
    //         4. If the score is 45 or higher, stop the game (by clearing the interval)
    //console.log(`TODO: Add a click listener for #${id} here`);
}

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
const interval = setInterval(() => {
    let rand = getRandomUnwhackedHoleId();
    console.log(rand);
    let rand_DOM = document.querySelector('#'+ rand); //we want to get the DOM element with id rand - returns a DOM element 
    rand_DOM.classList.add('needs-whack');
  //  console.log('TODO: Add the "needs-whack" class to a random hole');
}, 1000);



/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" 

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}