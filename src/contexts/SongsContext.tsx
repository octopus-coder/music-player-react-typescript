import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ISong } from "../types/ISong";

export interface ISongsContext {
  songs: ISong[];
  setSongs: Dispatch<SetStateAction<ISong[]>>;
}

export const SongsContext = createContext<ISongsContext>({} as ISongsContext);

const SongsProvider: React.FC = ({ children }) => {
  const [songs, setSongs] = useState<ISong[]>([]);
  return (
    <SongsContext.Provider
      value={{
        songs,
        setSongs,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export default SongsProvider;
