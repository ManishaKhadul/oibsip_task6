document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    const pendingCount = document.getElementById('pendingCount');
    const completedCount = document.getElementById('completedCount');

    let tasks = [];

    function renderTasks() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        let pendingTaskCount = 0;
        let completedTaskCount = 0;

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;
            listItem.className = task.completed ? 'completed' : '';

            const markCompleteButton = document.createElement('button');
            markCompleteButton.textContent = task.completed ? 'Undo' : 'Complete';
            markCompleteButton.className = 'complete-button';
            markCompleteButton.onclick = () => toggleComplete(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => deleteTask(index);

            listItem.appendChild(markCompleteButton);
            listItem.appendChild(deleteButton);

            if (task.completed) {
                completedTasksList.appendChild(listItem);
                completedTaskCount++;
            } else {
                pendingTasksList.appendChild(listItem);
                pendingTaskCount++;
            }
        });

        pendingCount.textContent = pendingTaskCount;
        completedCount.textContent = completedTaskCount;
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
