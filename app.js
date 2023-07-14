let tasks = [];

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskDescription = taskInput.value.trim();
  
  if (taskDescription !== '') {
    const task = {
      id: Date.now(),
      description: taskDescription,
      addedAt: new Date(),
      completed: false,
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTaskCompletion(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function editTask(taskId, newDescription) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].description = newDescription;
    renderTasks();
  }
}

function renderTasks() {
  const taskTableBody = document.getElementById('task-table-body');
  const taskSummary = document.getElementById('task-summary');
  
  // Clear table body
  taskTableBody.innerHTML = '';
  
  // Render tasks
  tasks.forEach(task => {
    const row = document.createElement('tr');
    
    const statusCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTaskCompletion(task.id);
    statusCell.appendChild(checkbox);
    row.appendChild(statusCell);
    
    const descriptionCell = document.createElement('td');
    const description = document.createElement('span');
    description.textContent = task.description;
    if (task.completed) {
      description.classList.add('completed');
    }
    descriptionCell.appendChild(description);
    row.appendChild(descriptionCell);
    
    const addedAtCell = document.createElement('td');
    addedAtCell.textContent = task.addedAt.toLocaleString();
    row.appendChild(addedAtCell);
    
    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);
    actionsCell.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
      const newDescription = prompt('Enter a new task description:', task.description);
      if (newDescription !== null) {
        editTask(task.id, newDescription.trim());
      }
    };
    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);
    
    taskTableBody.appendChild(row);
  });
  
  // Update task summary
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  taskSummary.textContent = `Total Tasks: ${totalTasks} | Completed Tasks: ${completedTasks}`;
}
