class ToDoList {
  constructor() {
    const form = document.querySelector('.add-task-form');
    const clearAllBtn = document.querySelector('.btn--clear-all');
    clearAllBtn.addEventListener('click', () => this.deleteAllCompletedTasks());

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.addTask();
    });

    this.editForm = document.querySelector('.edit-task-form');
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
      index: this.allTasks.length + 1,
    };
    this.allTasks.push(task);
    desc.value = '';
    this.reload();
  }

  // Delete the specefic task -> CORE REQUREMENT
  deleteTask(index) {
    if (this.isEditVisible()) {
      return;
    }
    this.allTasks.splice(index, 1);
    this.allTasks.forEach((task, newIndex) => {
      task.index = newIndex + 1;
    });
    this.reload();
  }

  // Edit each task
  editTask(task) {
    this.editForm.classList.remove('d-none');
    const editEl = document.getElementById('edit');
    editEl.placeholder = `Write here to change "${task.description}":`;
    editEl.value = task.description;
    editEl.focus();
    this.editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      for (let i = 0; i < this.allTasks.length; i += 1) {
        if (this.allTasks[i] === task) {
          this.allTasks[i].description = editEl.value;
          this.editForm.classList.add('d-none');
          this.reload();
        }
      }
    });

    this.editForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.editForm.classList.add('d-none');
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
    check.addEventListener('change', () => {
      task.completed = check.checked;
      this.saveTasks();
    });

    // Task Description
    const text = document.createElement('p');
    text.className = 'm-0';
    text.textContent = task.description;

    // Edit icon
    const editEl = document.createElement('ion-icon');
    editEl.name = 'create-outline';
    editEl.classList = 'edit-icon-item option--icon ms-auto';
    editEl.title = 'Edit';

    editEl.addEventListener('click', () => {
      if (this.isEditVisible()) {
        return;
      }
      this.editTask(task);
    });

    // Delete icon
    const deleteEl = document.createElement('ion-icon');
    deleteEl.name = 'trash-outline';
    deleteEl.classList = 'option--icon';
    deleteEl.title = 'Delete';

    deleteEl.addEventListener('click', () => {
      if (this.isEditVisible()) {
        return;
      }
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

  isEditVisible() {
    return !this.editForm.classList.contains('d-none');
  }

  deleteAllCompletedTasks() {
    this.allTasks = this.allTasks.filter((el) => !el.completed);
    this.allTasks.forEach((task, index) => {
      task.index = index + 1;
    });
    this.reload();
  }
}

export default ToDoList;
