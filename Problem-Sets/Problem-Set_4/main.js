/**
 * Cache a fetch() request in localStorage and return the cached data if it's not expired.
 * Useful if you are doing live editing refreshes and don't want to query the API every time.
 * 
 * @param {string} url The URL to fetch
 * @param {*} options The options to pass to fetch()
 * @param {number} cacheDuration The maximum age to use for cached data, in milliseconds
 * @returns A Promise that resolves to a Response object
 */
function fetchWithCache(url, options = {}, cacheDuration = 1000 * 60 * 60) { // Default cache duration is 1 hour
    // Utility function to create a Response object from data (like fetch() would)
    function getResponseObject(data) {
        return new Response(new Blob([JSON.stringify(data)]));
    }

    const cachedData = localStorage.getItem(url); // Check if we have cached data for this URL

    if (cachedData) { // If we do...
        const { timestamp, data } = JSON.parse(cachedData); // Parse the data from the cache
        // Note: This uses destructuring syntax. It's equivalent to:
        // const parsedCachedData = JSON.parse(cachedData);
        // const timestamp = parsedCachedData.timestamp;
        // const data = parsedCachedData.data;

        if (Date.now() - timestamp < cacheDuration) { //...and it's not expired,
            return Promise.resolve(getResponseObject(data)); // Return a promise whose value is the stored data
        } else { // it has expired, so remove it
            localStorage.removeItem(url);
        }
    }

    // If we don't have cached data or it's expired, fetch it from the network
    return fetch(url, options)
        .then((response) => response.json()) // Parse the JSON data from the response
        .then((data) => {
            localStorage.setItem(url, JSON.stringify({ // Store the data in localStorage with a timestamp
                timestamp: Date.now(),
                data
            }));
            return getResponseObject(data);
        });
}

/**
 * A function to randomly shuffle the items in an array and return a copy of the shuffled array.
 * Based on: https://stackoverflow.com/a/12646864
 * 
 * @param {Array} array An array of any type
 * @returns A shuffled copy of the array
 */
function shuffleArray(array) {
    const flattenedArray = array.flat(); // Flatten the nested arrays
    const shuffledArray = flattenedArray.slice(); // Copy the flattened array

    // Shuffle the flattened copy of the array using Fisher-Yates shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray; // Return the shuffled flattened array
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//CODE STARTS HERE 


const apiUrl = 'https://the-trivia-api.com/v2/questions';
let score = 0;
let totalQuestions = 0;

// Fetch questions and handle the response
fetchWithCache(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Process the retrieved questions
        console.log(data);
        displayQuestions(data);
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
    });





// Modify the displayQuestions function to add a unique class to each answer button
function displayQuestions(questions) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    questions.forEach((question, index) => {
        const shuffledAnswers = shuffleArray([question.incorrectAnswers, question.correctAnswer]);

        const listItem = document.createElement('li');
        listItem.textContent = question.question.text;

        const answerList = document.createElement('ul');

        shuffledAnswers.forEach((answer, answerIndex) => {
            const answerButton = document.createElement('button');
            answerButton.textContent = answer;
            answerButton.addEventListener('click', () => {
            console.log('Button clicked:', answer);
            handleAnswerClick(answer, question.correctAnswer, index)});

            const answerItem = document.createElement('li');
            answerItem.appendChild(answerButton);
            answerList.appendChild(answerItem);

            // Add a unique class to each answer button based on the question index
            answerButton.classList.add('question-' + index);
        });
        const feedbackElement = document.createElement('p');
        feedbackElement.id = 'feedback-' + index;

        listItem.appendChild(answerList);
        listItem.appendChild(feedbackElement); // Append the feedback element
        questionList.appendChild(listItem);
    });
}




const answeredQuestions = [];


// Function to handle user's answer
function handleAnswerClick(selectedAnswer, correctAnswer, questionIndex) {
    const feedbackElement = document.getElementById('feedback-' + questionIndex); // Get the feedback element for the current question
    const scoreElement = document.getElementById('score');

    // Check if the question has already been answered
    if (answeredQuestions.includes(questionIndex)) {
        feedbackElement.textContent = 'You have already answered this question.';
        feedbackElement.style.color = 'red';
        return; // Exit the function to prevent re-answering
    }

    // Mark the question as answered
    answeredQuestions.push(questionIndex);

    if (selectedAnswer === correctAnswer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.style.color = 'green';
        // Increment the score
        score++;
        totalQuestions++;
    } else {
        feedbackElement.textContent = 'Incorrect. The correct answer is: ' + correctAnswer;
        feedbackElement.style.color = 'red';
        totalQuestions++;
    }

    // Disable answer buttons for the current question to prevent further interaction
    const answerButtons = document.querySelectorAll('.question-' + questionIndex + ' button');
    answerButtons.forEach(button => button.setAttribute('disabled', 'disabled'));

    // Update the score display
    scoreElement.textContent = score + ' of ' + totalQuestions;
}



