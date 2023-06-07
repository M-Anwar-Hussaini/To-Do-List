class ToDoList {
  constructor() {
    const form = document.querySelector('.add-task-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addTask();
    });
    this.allTasks = [];
    this.storageName = 'to-do-list';
    this.loadTasks();
  }

  // Add a new task to the Task list --> CORE REQUREMENT
  addTask() {
    const desc = document.querySelector('#task');
    const task = {
      description: desc.value,
      completed: false,
      index: (this.allTasks.length + 1),
    };
    this.allTasks.push(task);
    desc.value = '';
    this.reload();
  }

  // Delete the specefic task -> CORE REQUREMENT
  deleteTask(index) {
    this.allTasks.splice(index, 1);
    this.allTasks.forEach((task, newIndex) => {
      task.index = newIndex + 1;
    });
    this.reload();
  }

  editTask(index, form) {
    const editEl = document.getElementById('edit');
    editEl.placeholder = `Write here to change "${this.allTasks[index].description}":`;
    editEl.value = '';
    editEl.focus();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.allTasks[index].description = editEl.value;
      form.classList.add('d-none');
      this.reload();
    });

    form.addEventListener('reset', (e) => {
      e.preventDefault();
      form.classList.add('d-none');
      this.reload();
    });
  }

  // Take the data from local storage and save it to the allTasks array
  loadTasks() {
    const storage = localStorage.getItem(this.storageName);
    if (storage) {
      this.allTasks = JSON.parse(storage);
    }
  }

  // Put the information fo allTasks'array to localStorage
  saveTasks() {
    localStorage.setItem(this.storageName, JSON.stringify(this.allTasks));
  }

  // Create a new task element
  createTaskElement(task, index) {
    // Create a task
    const newTask = document.createElement('li');
    newTask.id = index;
    newTask.className = 'd-flex gap-2 mx-2 pb-1 align-items-center border-bottom border-secondary-subtle ';

    // Checkbox to see whether the task is complete of not.
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'form-check';
    check.checked = task.completed;

    // Task Description
    const text = document.createElement('p');
    text.className = 'm-0';
    text.textContent = task.description;

    // Edot icon
    const editEl = document.createElement('ion-icon');
    editEl.name = 'create-outline';
    editEl.classList = 'edit-icon-item option--icon ms-auto';
    editEl.title = 'Edit';

    editEl.addEventListener('click', () => {
      const editForm = document.querySelector('.edit-task-form');
      if (!editForm.classList.contains('d-none')) {
        return;
      }
      editForm.classList.remove('d-none');
      this.editTask(index, editForm);
    });

    // Delete icon
    const deleteEl = document.createElement('ion-icon');
    deleteEl.name = 'trash-outline';
    deleteEl.classList = 'option--icon';
    deleteEl.title = 'Delete';

    deleteEl.addEventListener('click', () => {
      this.deleteTask(index);
    });

    newTask.appendChild(check);
    newTask.appendChild(text);
    newTask.appendChild(editEl);
    newTask.appendChild(deleteEl);
    return newTask;
  }

  // Display the tasks to the page
  displayAllTasks() {
    const taskContainer = document.querySelector('.all-tasks');
    taskContainer.innerHTML = '';
    this.allTasks.forEach((task, index) => {
      taskContainer.appendChild(this.createTaskElement(task, index));
    });
  }

  // Refresh and update page accordint to the latest changes
  reload() {
    this.saveTasks();
    this.loadTasks();
    this.displayAllTasks();
  }
}

export default ToDoList;
