import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

export const baseSelector = (state: RootState) => {
  return state.todo;
};

export const TodoListSelector = createSelector(
  baseSelector,
  state => state.todoList,
);

export const TodoCountSelector = createSelector(
  baseSelector,
  state => state.todoCount,
);
