import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

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

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 25px;
  border-bottom: solid 1px #eee;
`;

const TodoCheck = styled.input`
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
          <TodoList>
            <TodoItem>
              <TodoCheck type="checkbox"></TodoCheck>
              나는 투두야
            </TodoItem>
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
