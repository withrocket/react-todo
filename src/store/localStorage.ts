export const saveTodoData = (todoData: ITodoItem[]) => {
  localStorage.setItem('todoData', JSON.stringify(todoData));
};

export const loadTodoData = (): ITodoItem[] => {
  const todoData = localStorage.getItem('todoData');
  if (todoData) {
    return JSON.parse(todoData);
  }
  return [];
};

export const lodatTodoCount = (): number => {
  const todoData = localStorage.getItem('todoData');
  if (todoData) {
    return JSON.parse(todoData).length;
  }
  return 0;
};
