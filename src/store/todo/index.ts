import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TodoState } from './types';
import { useInjectReducer } from 'redux-injectors';
import { loadTodoData, lodatTodoCount, saveTodoData } from 'store/localStorage';

export const initialState: TodoState = {
  title: 'To Do',
  todoList: loadTodoData(),
  todoCount: lodatTodoCount(),
  lastAction: '',
};

const slice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<ITodoItem>) => {
        state.todoList.push(action.payload);
        saveTodoData(state.todoList);
        state.lastAction = 'add';
      },
      prepare: () => {
        const id: string = nanoid();
        return {
          payload: {
            id: id,
            content: '',
            completed: false,
            editing: true,
          },
        };
      },
    },
    checkTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const todo = state.todoList.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveTodoData(state.todoList);
    },
    editModeTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      for (const todo of state.todoList) {
        if (todo.id === id) continue;
        if (todo.editing === true) todo.editing = false;
      }
      const todo = state.todoList.find(todo => todo.id === id);
      if (todo) {
        todo.editing = !todo.editing;
      }
    },
    editTodo(state, action: PayloadAction<{ id: string; content: string }>) {
      const id = action.payload.id;
      const content = action.payload.content;
      const todo = state.todoList.find(todo => todo.id === id);
      if (!content) {
        const filteredTodos = state.todoList.filter(todo => todo.id !== id);
        state.todoList = filteredTodos;
        state.lastAction = 'addCancel';
        saveTodoData(state.todoList);
        return;
      }
      if (todo) {
        todo.content = content;
      }
      state.todoCount = state.todoList.length;
      state.lastAction = 'edit';

      saveTodoData(state.todoList);
    },
    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const todo = state.todoList.find(todo => todo.id === id);
      const filteredTodos = state.todoList.filter(todo => todo.id !== id);
      state.todoList = filteredTodos;
      state.todoCount = filteredTodos.length;
      state.lastAction = todo?.content ? 'delete' : 'addCancel';
      saveTodoData(state.todoList);
    },
    setLastAction(state, action: PayloadAction<string>) {
      state.lastAction = action.payload;
    },
    clearTodoList(state, action: PayloadAction<void>) {
      state.todoCount = 0;
      state.todoList = [];
      saveTodoData(state.todoList);
    },
  },
});

export const { actions: TodoActions } = slice;

export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { TodoActions: slice.actions };
};
