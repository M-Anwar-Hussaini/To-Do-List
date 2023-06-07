import './style.css';
import './bootstrap.min.css';

const allTasks = [
  {
    description: 'Configure webpack',
    completed: false,
    index: 0,
  },
  {
    description: 'Go to college',
    completed: true,
    index: 1,
  },
  {
    description: 'Request for a review',
    completed: false,
    index: 2,
  },
];

const displayTasks = () => {
  const elTaskList = document.querySelector('.all-tasks');
  elTaskList.innerHTML = '';
  allTasks.forEach((el, index) => {
    // Create a task
    const task = document.createElement('li');
    task.id = index;
    task.className = 'd-flex gap-2 mx-2 pb-1 align-items-center border-bottom border-secondary-subtle ';

    // Checkbox to see whether the task is complete of not.
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'form-check';
    check.checked = el.completed;

    // Task Description
    const text = document.createElement('p');
    text.className = 'm-0';
    text.textContent = el.description;

    // Opton icon
    const options = document.createElement('ion-icon');
    options.name = 'ellipsis-vertical-outline';
    options.classList = 'option--icon ms-auto';

    task.appendChild(check);
    task.appendChild(text);
    task.appendChild(options);

    elTaskList.appendChild(task);
  });
};
displayTasks();
