import React from 'react';
import styled from 'styled-components';
import CircleButton from '../Button/CircleButton';

const Container = styled.section`
  flex: 0 0 100px;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background-color: #fff;
`;

const ActionBar = styled.div`
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  padding: 10px;

  & > .add-button {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
  }

  & > .clear-button {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
`;

const Wrapper = styled.div`
  flex: 0 0 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
`;

const Title = styled.h1`
  flex: 1 1 auto;
  display: -webkit-box;
  height: 40px;
  margin: 0px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Count = styled.span`
  flex: 1 0 30px;
  font-size: 2em;
  text-align: right;
`;

export default function TheAppHeader({
  title,
  todoCount,
  addTodo,
  clearTodoList,
}: {
  title: string;
  todoCount: number;
  addTodo: () => void;
  clearTodoList: () => void;
}) {
  return (
    <Container>
      <ActionBar>
        <CircleButton
          className="clear-button"
          onClick={clearTodoList}
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
        <CircleButton
          className="add-button"
          onClick={addTodo}
          Icon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          )}
        ></CircleButton>
      </ActionBar>
      <Wrapper>
        <Title>{title}</Title>
        {todoCount > 0 && <Count>{todoCount}</Count>}
      </Wrapper>
    </Container>
  );
}
