import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  cursor: pointer;
  transition: background 0.2s ease;
  img {
    width: 30%;
    height: auto;
  }
  &:hover {
    background: rgb(222, 222, 255);
  }
`;

export const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  h3 {
    font-size: 1rem;
  }
  h4 {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    font-weight: normal;
  }
`;
