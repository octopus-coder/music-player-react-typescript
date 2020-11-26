import styled, { css } from 'styled-components';

interface AppContainerProps {
  libraryStatus: boolean;
}

export const AppContainer = styled.div<AppContainerProps>`
  transition: all 0.5s ease;
  ${(props) =>
    props.libraryStatus
      ? css`
          margin-left: 10%;
        `
      : null}
`;
