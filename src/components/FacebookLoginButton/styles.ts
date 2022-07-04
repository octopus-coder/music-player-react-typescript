import styled from "styled-components";

export const Container = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #1b74e4;
  padding: 0.5rem;
  transition: all 0.3s ease;
  color: white;
  &:hover {
    background: #1877f2;
    transform: scale(0.95);
  }
`;

export const NameContainer = styled.div`
  display: flex;
  gap: 5px;
  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
