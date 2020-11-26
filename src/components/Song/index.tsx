import React from 'react';
import { ISong } from '../../types/ISong';
import { Container } from './styles';

interface SongProps {
  currentSong: ISong;
}

const Song: React.FC<SongProps> = ({ currentSong }) => {
  return (
    <Container>
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </Container>
  );
};

export default Song;
