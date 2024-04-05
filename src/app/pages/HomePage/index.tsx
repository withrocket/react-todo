import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoItem from 'app/components/TodoItem';
import { useTodoSlice } from 'store/todo';
import { useDispatch, useSelector } from 'react-redux';
import {
  TodoListSelector,
  TodoLastActionSelector,
  TodoCountSelector,
  TodoTitleSelector,
} from 'store/todo/selector';
import TheAppHeader from 'app/components/TheAppHeader';
import CircleButton from 'app/components/Button/CircleButton';

const Wrapper = styled.div<{ isFloating: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;

  & > .top-button {
    position: fixed;
    bottom: -60px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out;
    transform: translate(0, ${props => (props.isFloating ? '-70px' : '0px')});
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  padding: 0px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 25px 100px -60px rgba(0, 0, 0, 0.18);
  border-radius: 15px;
  overflow: hidden;

  @media (max-width: 725px) {
    width: 100%;
    height: 100vh;
  }
`;

const TodoList = styled.div<{ ref?: any }>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 25px 15px 50px;
  overflow: auto;
  @media (max-width: 725px) {
    height: 1800px;
  }

  & > div:not(:first-child) {
    margin-top: 10px;
  }
`;

const TodoEmptyList = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 2.2em;
`;

export function HomePage() {
  const { TodoActions } = useTodoSlice();
  const title: string = useSelector(TodoTitleSelector);
  const todoCount: number = useSelector(TodoCountSelector);
  const todoList = useSelector(TodoListSelector);
  const lastAction: string = useSelector(TodoLastActionSelector);
  const [isHeaderFloating, setIsHeaderFloating] = React.useState(false);
  const dispatch = useDispatch();

  const listRef = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('lastAction:', lastAction);
      if (lastAction !== 'addCancel') {
        dispatch(TodoActions.addTodo());
      } else {
        dispatch(TodoActions.setLastAction(''));
      }
    },
    [lastAction],
  );

  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main App" />
      </Helmet>
      <Wrapper isFloating={isHeaderFloating}>
        <Box>
          <TheAppHeader
            title={title}
            todoCount={todoCount}
            addTodo={() => {
              dispatch(TodoActions.addTodo());
            }}
            clearTodoList={() => {
              dispatch(TodoActions.clearTodoList());
            }}
            isFloating={isHeaderFloating}
          ></TheAppHeader>
          <TodoList
            ref={listRef}
            onClick={handleClick}
            onScroll={(e: any) => {
              setIsHeaderFloating(e.target.scrollTop);
            }}
          >
            {todoList.length > 0 ? (
              todoList.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  addTodo={() => {
                    dispatch(TodoActions.addTodo());
                  }}
                  checkTodo={() =>
                    dispatch(TodoActions.checkTodo({ id: todo.id }))
                  }
                  editModeTodo={() =>
                    dispatch(TodoActions.editModeTodo({ id: todo.id }))
                  }
                  editTodo={(content: string) =>
                    dispatch(
                      TodoActions.editTodo({ id: todo.id, content: content }),
                    )
                  }
                  deleteTodo={() =>
                    dispatch(TodoActions.deleteTodo({ id: todo.id }))
                  }
                ></TodoItem>
              ))
            ) : (
              <TodoEmptyList>Empty</TodoEmptyList>
            )}
          </TodoList>
        </Box>
        <CircleButton
          className="top-button"
          onClick={() => {
            listRef.current?.scrollTo(0, 0);
          }}
          Icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
            </svg>
          )}
        ></CircleButton>
      </Wrapper>
    </>
  );
}
