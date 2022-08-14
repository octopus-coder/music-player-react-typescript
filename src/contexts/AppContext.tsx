import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { IMusicTime } from "../types/IMusicTime";
import { ISong } from "../types/ISong";
import { SongsContext } from "./SongsContext";

export interface IContext {
  currentSong: ISong;
  setCurrentSong: Dispatch<SetStateAction<ISong>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  songInfo: IMusicTime;
  setSongInfo: Dispatch<SetStateAction<IMusicTime>>;
  libraryStatus: boolean;
  setLibraryStatus: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IContext>({} as IContext);

const AppProvider: React.FC = ({ children }) => {
  const { songs } = useContext(SongsContext);
  const [currentSong, setCurrentSong] = useState<ISong>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState<IMusicTime>({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  return (
    <AppContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        songInfo,
        setSongInfo,
        libraryStatus,
        setLibraryStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
