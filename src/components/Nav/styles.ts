import styled from 'styled-components';

export const Container = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    border: 2px solid rgba(65, 65, 65);
    padding: 0.5rem;
    transition: all 0.3s ease;
    &:hover {
      background: rgb(65, 65, 65);
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    button {
      z-index: 10;
    }
  }
`;
