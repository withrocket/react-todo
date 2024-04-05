interface ITodoItemContent {
  content: string;
}

interface ITodoItem extends ITodoItemContent {
  id: string;
  completed: boolean;
  editing: boolean;
}

interface ITodoCategory {
  name: string;
  list: ITodoItem[];
}
