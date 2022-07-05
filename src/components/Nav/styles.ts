import styled from "styled-components";

export const Container = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 768px) {
    button {
      z-index: 10;
    }

    p {
      z-index: 10;
    }
  }
`;

export const LibraryButton = styled.button`
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
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
