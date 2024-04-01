import React from 'react';
import styled from 'styled-components';
import Checkbox from '../Checkbox';
import CircleButton from '../Button/CircleButton';
import TodoInput from '../TodoInput';

const Box = styled.div<{ isEditing?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  border-bottom: solid 1px #eee;
  background-color: ${props => (props.isEditing ? '#fcfcfc' : 'transparent')};

  & > div:first-child {
    flex: 0 0 20px;
    margin-right: 15px;
  }

  & > span {
    flex: 1 1 auto;
  }
  & > .delete-button {
    flex: 0 0 36px;
    display: none;
  }

  &:hover > .delete-button {
    display: flex;
  }
`;

const TodoContent = styled.span<{ checked?: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  cursor: text;
  text-decoration: ${props => (props.checked ? 'line-through' : 'initial')};
  color: ${props => (props.checked ? '#aaa' : '#212121')};
`;

export default function TodoItem({
  todo,
  checkTodo,
  editTodo,
  editModeTodo,
  deleteTodo,
}: {
  todo: ITodoItem;
  checkTodo: () => void;
  editTodo: (todo: string) => void;
  editModeTodo: () => void;
  deleteTodo: () => void;
}) {
  return (
    <Box isEditing={todo.editing}>
      <Checkbox checked={todo.completed} onClick={() => checkTodo()}></Checkbox>
      {todo.editing ? (
        <TodoInput
          isEditing={todo.editing}
          editTodo={(todo: string) => {
            editTodo(todo);
            editModeTodo();
          }}
          editContent={todo.content}
        />
      ) : (
        <TodoContent onClick={editModeTodo} checked={todo.completed}>
          {todo.content}
        </TodoContent>
      )}
      <CircleButton
        className="delete-button"
        onClick={deleteTodo}
        Icon={() => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        )}
      ></CircleButton>
    </Box>
  );
}
