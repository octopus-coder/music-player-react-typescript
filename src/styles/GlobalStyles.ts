import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  h1, h2, h3 {
    color: rgb(60, 60, 60);
  }
  *, input, button {
    font-family: 'Lato', sans-serif;
  }

  h3, h4 {
    font-weight: 400;
    color: rgba(100, 100, 100);
  }
`;
