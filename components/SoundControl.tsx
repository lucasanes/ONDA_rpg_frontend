import { useSocket } from '@/app/context/SocketContext';
import { Button } from '@nextui-org/button';
import { Slider } from '@nextui-org/react';
import { useRef, useState } from 'react';
import { GoMute, GoUnmute } from 'react-icons/go';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';

type SoundControlProps = {
  audioUrl: string;
  userIds: number[];
} & React.HTMLAttributes<HTMLDivElement>;

export function SoundControl({
  audioUrl,
  userIds,
  ...rest
}: SoundControlProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showVolume, setShowVolume] = useState<boolean>(false);

  const { emitAudioPause, emitAudioPlay, emitAudioVolume } = useSocket();

  const musicPercentageLocalStorage = localStorage.getItem(
    '@registroparanormal:musicPercentage'
  );

  const musicPercentage = musicPercentageLocalStorage
    ? parseFloat(musicPercentageLocalStorage)
    : 10;

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = (): void => {
    if (!audioUrl || !audioRef.current) return;

    audioRef.current
      .play()
      .catch((error) =>
        console.error('Erro ao tentar reproduzir o áudio:', error)
      );
    setPaused(false);
    audioRef.current.volume = volume / musicPercentage;
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTimeChange = (value: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);

      userIds.forEach((id) => {
        emitAudioPlay({ userId: Number(id), audioUrl, currentTime: value });
      });
    }
  };

  const handlePlayAudio = (): void => {
    setPaused(false);

    userIds.forEach((id) => {
      if (audioRef.current) {
        emitAudioPlay({
          userId: Number(id),
          audioUrl,
          currentTime: audioRef.current.currentTime,
        });
      }
    });
  };

  const handlePauseAudio = (): void => {
    setPaused(true);

    userIds.forEach((id) => {
      if (audioRef.current) {
        emitAudioPause({
          userId: Number(id),
          audioUrl,
          currentTime: audioRef.current.currentTime,
        });
      }
    });
  };

  const handleVolumeChange = (newVolume: number): void => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume / musicPercentage;
      setVolume(newVolume);

      userIds.forEach((id) => {
        emitAudioVolume({ userId: Number(id), audioUrl, volume: newVolume });
      });
    }
  };

  const handleMute = (): void => {
    setMuted(!muted);

    userIds.forEach((id) => {
      if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;

        emitAudioVolume({
          userId: Number(id),
          audioUrl,
          volume: audioRef.current.muted ? 0 : audioRef.current.volume,
        });
      }
    });
  };

  return (
    <div className='min-w-72 w-96 max-w-96 flex flex-col gap-2'>
      <audio
        aria-label='audio'
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlayAudio}
        onPause={handlePauseAudio}
        onTimeUpdate={handleTimeUpdate}
        loop
      >
        <source src={audioUrl} type='audio/mpeg' />
      </audio>

      <div className='w-full -ml-1 flex gap-3 justify-start items-center'>
        <Button
          className='min-w-0 p-2'
          aria-label='play'
          color='secondary'
          variant='light'
          disabled={!audioUrl}
          onPress={() => {
            if (paused) {
              audioRef.current
                ?.play()
                .catch((error) =>
                  console.error('Erro ao tentar reproduzir o áudio:', error)
                );
            } else {
              audioRef.current?.pause();
            }
          }}
        >
          {paused ? (
            <IoPlayCircleOutline size={30} />
          ) : (
            <IoPauseCircleOutline size={30} />
          )}
        </Button>

        <div
          className='w-full flex gap-4 items-center justify-start'
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <Button
            className='min-w-0 p-2'
            variant='light'
            color='secondary'
            aria-label='mute'
            disabled={!audioUrl}
            onPress={handleMute}
          >
            {muted ? <GoMute size={25} /> : <GoUnmute size={25} />}
          </Button>
          <Slider
            aria-label='volume'
            className={`w-1/2 ${showVolume ? 'block' : 'hidden'}`}
            color='secondary'
            size='sm'
            minValue={0}
            maxValue={1}
            step={0.01}
            value={volume}
            onChange={(value) => handleVolumeChange(Number(value))}
          />
        </div>
      </div>

      <div className='flex gap-2'>
        <span>{formatTime(currentTime)}</span>
        <Slider
          aria-label='time'
          color='secondary'
          size='md'
          minValue={0}
          value={currentTime}
          maxValue={duration}
          step={1}
          defaultValue={0}
          onChange={(value) => handleTimeChange(Number(value))}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
