import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { useState } from "react";
import App from "../components/App";
import AppProvider from "../contexts/AppContext";
import FBUserProvider from "../contexts/FBUserContext";
import { SongsContext } from "../contexts/SongsContext";
import data from "../data";
import { ISong } from "../types/ISong";

interface SongsProps {
  songsData: ISong[];
}

const Home: NextPage<SongsProps> = ({ songsData }) => {
  const [songs, setSongs] = useState<ISong[]>(songsData);

  return (
    <SongsContext.Provider value={{ songs, setSongs }}>
      <AppProvider>
        <FBUserProvider>
          <App />
        </FBUserProvider>
      </AppProvider>
    </SongsContext.Provider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const songsData = data();

  return {
    props: { songsData },
  };
};
