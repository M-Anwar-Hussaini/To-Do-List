import './style.css';
import './bootstrap.min.css';
import ToDoList from './main.js';

window.addEventListener('load', () => {
  const list = new ToDoList();
  list.displayAllTasks();
});
