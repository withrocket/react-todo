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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;
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

const TodoList = styled.div`
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
  const dispatch = useDispatch();

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
      <Wrapper>
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
          ></TheAppHeader>
          <TodoList onClick={handleClick}>
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
      </Wrapper>
    </>
  );
}
