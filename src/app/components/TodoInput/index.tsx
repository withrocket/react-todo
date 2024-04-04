import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Box = styled.div<{ isEditing?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0px;
  border: none;
`;

const Input = styled.input`
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: transparent;
  border: none;
  outline: none;
`;

export default function TodoInput({
  addTodo,
  isEditing,
  editContent,
  editTodo,
}: {
  addTodo?: (content: string) => void;
  isEditing?: boolean;
  editContent?: string;
  editTodo?: (content: string) => void;
}) {
  const [content, setContent] = React.useState<string>(editContent || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <Box isEditing={isEditing}>
      <Input
        ref={inputRef}
        value={content}
        onChange={e => setContent(e.target.value)}
        onBlur={e => {
          if (e.currentTarget === e.target) {
            editTodo && editTodo(content);
          }
        }}
        onKeyPress={e => {
          if (content.trim() === '') return;
          if (e.key !== 'Enter') return;
          if (isEditing) {
            editTodo && editTodo(content);
          } else {
            addTodo && addTodo(content.trim());
            setContent('');
          }
        }}
        placeholder="할일을 입력해 주세요."
      />
    </Box>
  );
}
