import styled from "styled-components";

export const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 20%;
    height: auto;
    border-radius: 50%;
  }
  h2 {
    padding: 3rem 1rem 1rem 1rem;
  }
  h3 {
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 60%;
      height: auto;
    }
  }
`;
