import styled, { css } from 'styled-components';

interface TrackProps {
  startColor: string;
  endColor: string;
}

interface AnimateTrackProps {
  completion: number;
}

export const Container = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TimeControl = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
  }
  p {
    padding: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Track = styled.div<TrackProps>`
  width: 100%;
  height: 1rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  ${(props) =>
    css`
      background: linear-gradient(
        to right,
        ${props.startColor},
        ${props.endColor}
      );
    `}
`;

export const AnimateTrack = styled.div<AnimateTrackProps>`
  background: rgb(204, 204, 204);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ${(props) => css`
    transform: translateX(${props.completion}%);
  `}
  pointer-events: none;
`;

export const PlayControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 30%;
  svg {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    width: 60%;
  }
`;
