import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';
import {
  AnimateTrack,
  Container,
  PlayControl,
  TimeControl,
  Track,
} from './styles';

interface PlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Player: React.FC<PlayerProps> = ({ audioRef }) => {
  const {
    currentSong,
    setCurrentSong,
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo,
  } = useContext(AppContext);
  // Event Handlers
  const playSongHandler = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      await audioRef.current?.play();
    }
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const dragHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentTime = parseInt(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setSongInfo({ ...songInfo, currentTime });
  };

  const skipTrackHandler = async (direction: string) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    switch (direction) {
      case 'skip-back':
        setCurrentSong({
          ...songs[(currentIndex - 1 + songs.length) % songs.length],
          active: true,
        });
        break;
      case 'skip-forward':
        setCurrentSong({
          ...songs[(currentIndex + 1 + songs.length) % songs.length],
          active: true,
        });
        break;
    }
  };

  useEffect(() => {
    setSongs((songs) =>
      songs.map((song) =>
        song.id === currentSong.id
          ? { ...song, active: true }
          : { ...song, active: false }
      )
    );
  }, [currentSong, setSongs]);

  useEffect(() => {
    const playSong = async () => {
      if (isPlaying) await audioRef.current?.play();
    };
    playSong();
  }, [isPlaying, currentSong, audioRef]);

  const getTime = (time: number) =>
    Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

  return (
    <Container>
      <TimeControl>
        <p>{getTime(songInfo.currentTime)}</p>
        <Track
          startColor={currentSong.color[0]}
          endColor={currentSong.color[1]}
        >
          <input
            min={0}
            max={isNaN(songInfo.duration) ? 0 : songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <AnimateTrack
            completion={(songInfo.currentTime / songInfo.duration) * 100}
          />
        </Track>
        <p>
          {isNaN(songInfo.duration) ? 'loading...' : getTime(songInfo.duration)}
        </p>
      </TimeControl>
      <PlayControl>
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler('skip-back');
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipTrackHandler('skip-forward');
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </PlayControl>
    </Container>
  );
};

export default Player;
