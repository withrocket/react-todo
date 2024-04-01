import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: content;
  width: 36px;
  height: 36px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default function CircleButton({
  className,
  onClick,
  Icon,
}: {
  className?: string;
  onClick: () => void;
  Icon: () => JSX.Element;
}) {
  return (
    <Circle onClick={onClick} className={className}>
      <Icon></Icon>
    </Circle>
  );
}
