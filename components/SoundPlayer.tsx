import { useSocket } from '@/app/context/SocketContext';
import { Button, DropdownItemProps } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { GoMute, GoUnmute } from 'react-icons/go';

type SoundPlayerProps = {
  userId: number;
} & DropdownItemProps;

interface AudioPlayData {
  audioUrl: string;
  currentTime: number;
}

export function SoundPlayer({ userId }: SoundPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const {
    onAudioPlay,
    onAudioPause,
    audioPauseOff,
    audioPlayOff,
    onAudioVolume,
    audioVolumeOff,
  } = useSocket();

  const musicPercentageLocalStorage = localStorage.getItem('@ONDA:volume');

  const musicPercentage = musicPercentageLocalStorage
    ? 11 - Number(musicPercentageLocalStorage)
    : 1;

  useEffect(() => {
    if (isPlaying) {
      onAudioPlay(userId, (data: AudioPlayData) => {
        setAudioUrl(data.audioUrl);
        if (audioRef.current) {
          audioRef.current.volume = 1 / musicPercentage;
          audioRef.current.currentTime = data.currentTime;
          audioRef.current
            .play()
            .catch((error) =>
              console.error('Erro ao tentar reproduzir o áudio:', error)
            );
        }
      });

      onAudioPause(userId, (data: { currentTime: number }) => {
        if (audioRef.current) {
          audioRef.current.currentTime = data.currentTime;
          audioRef.current.pause();
        }
      });

      onAudioVolume(userId, (data) => {
        if (audioRef.current) {
          audioRef.current.volume = data.volume / musicPercentage;
        }
      });
    }

    return () => {
      audioPauseOff(userId);
      audioPlayOff(userId);
      audioVolumeOff(userId);
    };
  }, [isPlaying]);

  const handleActive = (): void => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) =>
          console.error('Erro ao tentar reproduzir o áudio:', error)
        );
    }
  };

  const handleDesactive = (): void => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <Button
      onPress={!isPlaying ? handleActive : handleDesactive}
      className='w-24'
      variant='flat'
    >
      {isPlaying && <audio ref={audioRef} src={audioUrl || undefined} loop />}
      {!isPlaying ? <GoMute size={20} /> : <GoUnmute size={20} />}
      <span>Sons</span>
    </Button>
  );
}
