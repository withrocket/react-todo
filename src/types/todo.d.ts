interface ITodoItemContent {
  content: string;
}

interface ITodoItem extends ITodoItemContent {
  id: string;
  compoleted: boolean;
  editing: boolean;
}
