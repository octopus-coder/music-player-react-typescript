import React, { ChangeEvent, useCallback, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import { AppContainer } from './styles';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const {
    songs,
    currentSong,
    setCurrentSong,
    setSongInfo,
    libraryStatus,
  } = useContext(AppContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdateHandler = useCallback(
    (event: ChangeEvent<HTMLAudioElement>) => {
      const currentTime = event.target.currentTime;
      const duration = event.target.duration;
      setSongInfo({ currentTime, duration });
    },
    [setSongInfo]
  );

  const songEndHandler = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong({
      ...songs[(currentIndex + 1 + songs.length) % songs.length],
      active: true,
    });
  };

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <Nav />
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} />
      <Library audioRef={audioRef} />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
      <GlobalStyles />
    </AppContainer>
  );
}

export default App;
