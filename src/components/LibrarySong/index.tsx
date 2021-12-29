import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { getClientIP } from "../../services/capi";
import { ISong } from "../../types/ISong";
import { Container, SongInfo } from "./styles";

interface LibrarySongProps {
  song: ISong;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song, audioRef }) => {
  const { songs, setCurrentSong, setSongs, isPlaying } = useContext(AppContext);

  const songSelectHandler = async () => {
    setSongs(
      songs.map((s) =>
        s.id === song.id ? { ...s, active: true } : { ...s, active: false }
      )
    );
    setCurrentSong({ ...song, active: true });
    if (isPlaying) await audioRef.current?.play();
    const client_ip_address = await getClientIP();
    await axios.post("/api/conversions", {
      songName: song.name,
      client_ip_address,
    });
  };

  return (
    <Container
      onClick={songSelectHandler}
      className={song.active ? "selected" : ""}
    >
      <img src={song.cover} alt={song.name} />
      <SongInfo>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </SongInfo>
    </Container>
  );
};

export default LibrarySong;
