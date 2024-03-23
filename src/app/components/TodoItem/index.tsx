import React from 'react';
import styled from 'styled-components';
import Block from '../Block';
import Checkbox from '../Checkbox';

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  border-bottom: solid 1px #eee;
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

export default function TodoItem({ todo }: { todo: ITodoItem }) {
  return (
    <Box>
      <Checkbox checked={todo.compoleted}></Checkbox>
      <Block marginLeft="10px"></Block>
      <TodoContent checked={todo.compoleted}>{todo.content}</TodoContent>
    </Box>
  );
}
