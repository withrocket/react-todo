import React from 'react';
import styled from 'styled-components';

const Circle = styled.div<{ checked?: boolean }>`
  width: 20px;
  height: 20px;
  min-width: 20px;
  padding: 3px;
  cursor: pointer;
  border-radius: 50%;
  border: solid 2px ${props => (props.checked ? 'red' : '#eee')};

  & > .checkbox-icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: red;
  }
`;

export default function Checkbox({
  checked,
  onClick,
}: {
  checked?: boolean;
  onClick?: () => void;
}) {
  return (
    <Circle checked={checked} onClick={onClick}>
      {checked ? <div className="checkbox-icon" /> : null}
    </Circle>
  );
}
