fetchWithCache('https://the-trivia-api.com/v2/questions')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        for (const item of data){
            //console.log(item.incorrectAnswers);
            const question = document.createElement('p');
            question.textContent = item.question.text;
            document.querySelector('body').append(question); //don't need getElement by id, can use querySelector ins
            const wrongAnswers = document.createElement('ul');
            wrongAnswers.textContent = item.incorrectAnswers;
            document.querySelector('body').append(wrongAnswers);
            const rightAnswer = document.createElement('ul');
            rightAnswer.textContent = item.correctAnswer;
            document.querySelector('body').append(rightAnswer);

        }
    
    });


    function displayQuestions(questions) {
        const questionList = document.getElementById('question-list');
        questionList.innerHTML = '';
    
        questions.forEach(question => {
            const shuffledAnswers = shuffleArray([question.incorrectAnswers, question.correctAnswer]);
            
    
            const listItem = document.createElement('li');
            listItem.textContent = question.question.text;
    
            const answerList = document.createElement('ul');
    
            shuffledAnswers.forEach(answer => {
                const answerButton = document.createElement('button');
                answerButton.textContent = answer;
                answerButton.addEventListener('click', () => handleAnswerClick(answer, question.correctAnswer));
    
                const answerItem = document.createElement('li');
                answerItem.appendChild(answerButton);
                answerList.appendChild(answerItem);
            });
            //const correctAnswer = question.correctAnswer;
            //const answerButton = document.createElement('button');
              //  answerButton.textContent = correctAnswer;
               // answerButton.addEventListener('click', () => handleAnswerClick(answer, question.correctAnswer));
    
    
            listItem.appendChild(answerList);
            questionList.appendChild(listItem);
        });
    }