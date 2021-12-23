// import ReactPixel from 'react-facebook-pixel';
import {
  ChangeEvent,
  default as React,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { AppContext, IContext } from "../../contexts/AppContext";
import { GlobalStyles } from "../../styles/GlobalStyles";
import Library from "../Library";
import Nav from "../Nav";
import Player from "../Player";
import Song from "../Song";
import { AppContainer } from "./styles";

const App: React.FC = () => {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.NEXT_PUBLIC_PIXEL_ID}`);
        ReactPixel.pageView();
      });
  }, []);

  const { songs, currentSong, setCurrentSong, setSongInfo, libraryStatus } =
    useContext<IContext>(AppContext);

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
        src={currentSong?.audio}
        onEnded={songEndHandler}
      />
      <GlobalStyles />
    </AppContainer>
  );
};

export default App;
