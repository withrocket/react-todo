import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/TodoInput';
import TodoItem from 'app/components/TodoItem';
import { useTodoSlice } from 'store/todo';
import { useDispatch, useSelector } from 'react-redux';
import { TodoListSelector } from 'store/todo/selector';

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
  width: 400px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0px 25px 100px -60px rgba(0, 0, 0, 0.18);
  border-radius: 15px;

  & > div:nth-child(2) {
    padding-left: 25px;
    padding-right: 25px;
    border-bottom: solid 1px #eee;
  }
`;

const Title = styled.h1`
  margin: 0px;
  padding: 15px 25px;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
`;

export function HomePage() {
  const { TodoActions } = useTodoSlice();
  const todoList = useSelector(TodoListSelector);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main App" />
      </Helmet>
      <Wrapper>
        <Box>
          <Title>할 일</Title>
          <TodoInput
            addTodo={(content: string) =>
              dispatch(TodoActions.addTodo(content))
            }
          ></TodoInput>
          <TodoList>
            {todoList.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
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
            ))}
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
