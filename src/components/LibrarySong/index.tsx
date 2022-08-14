import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { FBUserContext } from "../../contexts/FBUserContext";
import { SongsContext } from "../../contexts/SongsContext";
import { getClientIP } from "../../services/capi";
import { ISong } from "../../types/ISong";
import { Container, SongInfo } from "./styles";

interface LibrarySongProps {
  song: ISong;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song, audioRef }) => {
  const { songs, setSongs } = useContext(SongsContext);
  const { setCurrentSong, isPlaying } = useContext(AppContext);
  const { fb_id: fb_login_id } = useContext(FBUserContext);

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
      fb_login_id,
    });
  };

  return (
    <Container
      onClick={songSelectHandler}
      className={song.active ? "selected" : ""}
    >
      <img src={song.cover} alt={song.name} width={72} height={72} />
      <SongInfo>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </SongInfo>
    </Container>
  );
};

export default LibrarySong;
