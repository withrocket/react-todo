import React, { useEffect } from 'react';
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
  padding: 0px;
  background-color: #fafafa;
  border-radius: 8px;

  & > div:first-child {
    flex: 0 0 20px;
    margin: 0px 15px;
  }

  &:hover {
    background-color: #f6f7f8;
    .delete-button {
      display: flex;
    }
  }
`;

const Wrapper = styled.section`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 50px;
  & > span {
    flex: 1 1 auto;
    height: 20px;
    line-height: 20px;
  }
  & > .delete-button {
    flex: 0 0 36px;
    display: none;
    margin-right: 15px;
  }
`;

const TodoContent = styled.span<{ checked?: boolean }>`
  flex: 1 1 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
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
  addTodo,
  checkTodo,
  editTodo,
  editModeTodo,
  deleteTodo,
}: {
  todo: ITodoItem;
  addTodo: () => void;
  checkTodo: () => void;
  editTodo: (todo: string) => void;
  editModeTodo: () => void;
  deleteTodo: () => void;
}) {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('The TodoItem is clicked.');
  };

  useEffect(() => {
    // if (!todo.content) {
    //   editModeTodo();
    // }
  }, []);

  return (
    <Box isEditing={todo.editing} onClick={handleClick}>
      <Checkbox checked={todo.completed} onClick={() => checkTodo()}></Checkbox>
      <Wrapper>
        {todo.editing ? (
          <TodoInput
            onBlur={(content: string) => {
              console.log('The TodoInput is blured. content:', content);
              if (!content) deleteTodo();
            }}
            addTodo={() => {
              addTodo();
            }}
            isEditing={todo.editing}
            editTodo={(todo: string) => {
              if (todo) {
                editTodo(todo);
                editModeTodo();
              }
            }}
            editContent={todo.content}
          />
        ) : (
          <TodoContent
            onClick={() => {
              editModeTodo();
            }}
            checked={todo.completed}
          >
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
              fill="red"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          )}
        ></CircleButton>
      </Wrapper>
    </Box>
  );
}
