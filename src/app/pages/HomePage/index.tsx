import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/TodoInput';
import TodoItem from 'app/components/TodoItem';
import { useTodoSlice } from 'store/todo';
import { useDispatch, useSelector } from 'react-redux';
import { TodoListSelector, TodoCountSelector } from 'store/todo/selector';
import { useState } from 'react';

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
  padding: 0px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 25px 100px -60px rgba(0, 0, 0, 0.18);
  border-radius: 15px;

  @media (max-width: 725px) {
    width: 100%;
    height: 100vh;
  }
  & > div:nth-child(2) {
    padding-left: 25px;
    padding-right: 25px;
    border-bottom: solid 1px #eee;
  }
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 725px) {
    height: 1800px;
  }
`;

const Header = styled.header`
  position: relative;
  height: 80px;
  z-index: 50;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 15px 25px;
  background-color: #fff;
  transition: 0s;
`;

const Title = styled.h1`
  flex: 1 1 auto;
  margin: 0px;
  padding: 0px;
`;

const Count = styled.span`
  font-size: 2.1em;
`;

export function HomePage() {
  const { TodoActions } = useTodoSlice();
  const todoList = useSelector(TodoListSelector);
  const todoCount = useSelector(TodoCountSelector);
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main App" />
      </Helmet>
      <Wrapper>
        <Box>
          <Header>
            <HeaderWrapper>
              <Title>할 일</Title>
              <Count>{todoCount}</Count>
            </HeaderWrapper>
          </Header>

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
