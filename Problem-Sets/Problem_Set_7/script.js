document.addEventListener('DOMContentLoaded', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let { selectedTaskIndex, workDuration, breakDurationInput } = { ...JSON.parse(localStorage.getItem('timerState')) };
    let breakDuration = parseInt(breakDurationInput?.value, 10) || 5;
    let timerInterval, sessionInProgress = false, secondsLeft = 0;

    if (sessionInProgress && secondsLeft > 0) resumeSession();
    else if (sessionInProgress) startBreak();

    function updateTaskList() {
        const taskListElement = document.getElementById('taskList');
        taskListElement.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = index === selectedTaskIndex ? 'selected-task' : ''; // Check if the index matches selectedTaskIndex
            li.innerHTML = `
                <span class="editable" contenteditable="true" onblur="updateTaskName(${index}, this)">
                    ${task.name}
                </span> - 
                <span class="editable" onclick="editTaskDescription(${index})">${task.description}</span> 
                (${task.workSessions} sessions)
                <button class="removeButton" data-index="${index}">Remove</button>
                <button class="selectButton" data-index="${index}">Select</button>
            `;
            taskListElement.appendChild(li);
        });
    }
    
    

    function addTask() {
        const taskNameInput = document.getElementById('taskName');
        const taskDescriptionInput = document.getElementById('taskDescription');
    
        if (!taskNameInput || !taskDescriptionInput) {
            console.error('Task name or description input elements not found.');
            return;
        }
    
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
    
        if (!taskName) {
            console.error('Task name is empty.');
            return;
        }
    
        tasks.push({ name: taskName, description: taskDescription, workSessions: 0 });
        updateTaskList();
    
        // Clear input fields
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
    
        // Store tasks in local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    

    function removeTask(index) {
        tasks.splice(index, 1);
        updateTaskList();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskName (index, element) {
        tasks[index].name = element.textContent.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function editTaskDescription(index) {
        const newDescription = prompt('Enter a new description for the task:', tasks[index].description);
        if (newDescription !== null) {
            tasks[index].description = newDescription.trim();
            updateTaskList();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function selectTask(index) {
        selectedTaskIndex = index;
        secondsLeft = 0;
        updateTaskList();
        displaySelectedTaskName(); // Call function to display selected task name
    }
    
    function displaySelectedTaskName() {
        const selectedTaskNameElement = document.getElementById('selectedTaskName');
        if (selectedTaskIndex !== null) {
            selectedTaskNameElement.textContent = `Selected Task: ${tasks[selectedTaskIndex].name}`;
        } else {
            selectedTaskNameElement.textContent = '';
        }
    }
    

    function startSession() {
        if (selectedTaskIndex === null) return alert('Please select a task before starting a session.');
        const [timerElement, sessionStatusLabel, workDurationInput] = [document.getElementById('timerDisplay'), document.getElementById('sessionStatus'), document.getElementById('workDuration')];
        let workDuration = parseInt(workDurationInput.value, 10) || 25;
        if (!sessionInProgress) {
            if (secondsLeft === 0) {
                timerElement.textContent = formatTime(workDuration * 60);
                sessionStatusLabel.textContent = 'Work Session';
                secondsLeft = workDuration * 60;
            }
            timerInterval = setInterval(() => {
                timerElement.textContent = formatTime(secondsLeft);
                if (secondsLeft <= 0) clearInterval(timerInterval), startBreak();
                secondsLeft--, saveTimerState();
            }, 1000);
            sessionInProgress = true;
        }
    }

    function resumeSession() {
        const [timerElement, sessionStatusLabel] = [document.getElementById('timerDisplay'), document.getElementById('sessionStatus')];
        timerInterval = setInterval(() => {
            timerElement.textContent = formatTime(secondsLeft);
            if (secondsLeft <= 0) clearInterval(timerInterval), startBreak();
            secondsLeft--, saveTimerState();
        }, 1000);
        sessionStatusLabel.textContent = 'Work Session';
    }

    function startBreak() {
        const [timerElement, sessionStatusLabel] = [document.getElementById('timerDisplay'), document.getElementById('sessionStatus')];
        timerElement.textContent = formatTime(breakDuration * 60);
        sessionStatusLabel.textContent = 'Take a break';
        tasks[selectedTaskIndex].workSessions += 1;
        updateTaskList();
        addLemonIcon();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        selectedTaskIndex = null;
        sessionInProgress = false;
        playTone(), secondsLeft = breakDuration * 60;
        timerInterval = setInterval(() => {
            timerElement.textContent = formatTime(secondsLeft);
            if (secondsLeft <= 0) clearInterval(timerInterval), startSession();
            secondsLeft--, saveTimerState();
        }, 1000);
    }

    function playTone() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    }

    function stopSession() {
        clearInterval(timerInterval);
        sessionInProgress = false;
        selectedTaskIndex = null;
        saveTimerState();
    }

    function addLemonIcon() {
        const lemonIcon = document.createElement('i');
        lemonIcon.className = 'fas fa-lemon';
        lemonIcon.style.color = '#FFFF00';
        const lemonIconContainer = document.getElementById('lemonIcons');
        lemonIconContainer ? lemonIconContainer.appendChild(lemonIcon) : console.error('Error: Lemon icon container not found.');
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function saveTimerState() {
        const timerState = { selectedTaskIndex, workDuration, breakDuration, sessionInProgress, secondsLeft };
        localStorage.setItem('timerState', JSON.stringify(timerState));
    }

    breakDurationInput?.addEventListener('change', function () { breakDuration = parseInt(breakDurationInput.value, 10) || 5, saveTimerState() });
    document.getElementById('addTaskButton')?.addEventListener('click', addTask);
    document.getElementById('startButton')?.addEventListener('click', startSession);
    document.getElementById('stopButton')?.addEventListener('click', stopSession);

    document.getElementById('taskList')?.addEventListener('click', function (event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const index = target.getAttribute('data-index');
            target.classList.contains('removeButton') ? removeTask(index) : target.classList.contains('selectButton') && selectTask(index);
        }
    });

    updateTaskList();
});
