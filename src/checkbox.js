// eslint-disable-next-line import/prefer-default-export
export function changeStatus(btn, task) {
  task.completed = btn.checked;
}

export function deleteAllCompletedTasks(tasks) {
  return tasks.filter((el) => !el.completed);
}
