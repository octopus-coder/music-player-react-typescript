import { createContext, useState } from "react";
import data from "../data";
import { IMusicTime } from "../types/IMusicTime";
import { ISong } from "../types/ISong";

export interface IContext {
  songs: ISong[];
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  currentSong: ISong;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  songInfo: IMusicTime;
  setSongInfo: React.Dispatch<React.SetStateAction<IMusicTime>>;
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IContext>({} as IContext);

const AppProvider: React.FC = ({ children }) => {
  const [songs, setSongs] = useState<ISong[]>(data());
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
        songs,
        setSongs,
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
