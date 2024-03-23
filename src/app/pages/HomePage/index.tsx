import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/TodoInput';

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
`;

const Title = styled.h1`
  margin: 0px;
  padding: 15px 25px;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoListItem = styled.div`
  display: flex;
  flex: 0 0 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0px 15px;
  border-bottom: solid 1px #eee;
  &:hover {
    background-color: #eee;
  }
`;

const TodoCheck = styled.input`
  flex: 0 0 30px;
  margin-right: 15px;
`;

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main App" />
      </Helmet>
      <Wrapper>
        <Box>
          <Title>할 일</Title>
          <TodoInput></TodoInput>
          <TodoList>
            <TodoListItem>
              <TodoCheck type="checkbox"></TodoCheck>
              나는 투두야
            </TodoListItem>
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
