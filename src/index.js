import './style.css';
import './bootstrap.min.css';
import ToDoList from './functionalities.js';

window.addEventListener('load', () => {
  const list = new ToDoList();
  list.displayAllTasks();
});
