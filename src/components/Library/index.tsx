import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import LibrarySong from '../LibrarySong';
import { Container, LibrarySongs } from './styles';

interface LibraryProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Library: React.FC<LibraryProps> = ({ audioRef }) => {
  const { libraryStatus, songs } = useContext(AppContext);
  return (
    <Container isVisible={libraryStatus}>
      <h1>Library</h1>
      <LibrarySongs>
        {songs.map((song) => (
          <LibrarySong key={song.id} song={song} audioRef={audioRef} />
        ))}
      </LibrarySongs>
    </Container>
  );
};

export default Library;
