import styled, { css } from 'styled-components';

interface ContainerProps {
  isVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  background: white;
  box-shadow: 2px 2px 50px rgb(204, 204, 204);
  overflow: scroll;
  ${(props) =>
    props.isVisible
      ? css`
          transform: translateX(0%);
          opacity: 1;
        `
      : css`
          transform: translateX(-100%);
          opacity: 0;
        `}
  transition: all 0.5s ease;
  h1,
  h2 {
    padding: 2rem;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }

  .selected {
    background: rgb(200, 200, 255);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const LibrarySongs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
