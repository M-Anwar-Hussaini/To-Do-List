export function changeStatus(btn, task) {
  task.completed = btn.checked;
}

export function deleteAllCompletedTasks(tasks) {
  const updatedTasks = tasks.filter((el) => !el.completed);
  updatedTasks.forEach((task, index) => {
    task.index = index + 1;
  });
  return updatedTasks;
}
