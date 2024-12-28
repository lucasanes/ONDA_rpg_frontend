import { SessionInterface } from '@/types/session';
import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

type Status =
  | 'fighting'
  | 'tired'
  | 'hurted'
  | 'dying'
  | 'unconscious'
  | 'hp'
  | 'currentHp'
  | 'mp'
  | 'currentMp'
  | 'mun'
  | 'currentMun'
  | 'money';

type OnPortraitCharacter = {
  key: Status;
  value: boolean | number;
};

type EmitPortraitCharacter = OnPortraitCharacter & {
  characterId: number;
};

type OnXPCharacter = {
  xp: number;
};

type EmitXPCharacter = OnXPCharacter & {
  characterId: number;
};

type OnInvite = {
  sessionId: number;
  id: number;
  session: SessionInterface;
};

type EmitInvite = OnInvite & {
  userId: number;
};

type OnItem = {
  senderName: string;
};

type EmitItem = OnItem & {
  characterId: number | null;
  sessionId: number | null;
};

type OnImage = {
  image: string;
};

type EmitImage = OnImage & {
  sessionId: number;
};

type EmitCleanImage = {
  sessionId: number;
};

type OnRollDice = {
  name: string;
  portrait: string | null;
  dice: {
    total: number;
    dice: string;
    bonus: string;
    rollDices: {
      total: number;
      quantity: number;
      faces: number;
      rolls: number[];
    }[];
  };
  isD20: boolean;
  isCritical: boolean;
  isDisaster: boolean;
};

type EmitRollDice = OnRollDice & {
  sessionId: number | null;
  characterId: number | null;
};

type OnAudioPlayAndPause = {
  audioUrl: string;
  currentTime: number;
};

type EmitAudioPlayAndPause = OnAudioPlayAndPause & {
  userId: number;
};

type OnAudioVolume = {
  volume: number;
  audioUrl: string;
};

type EmitAudioVolume = OnAudioVolume & {
  userId: number;
};

interface SocketContextValue {
  onStatusCharacter: (
    id: number,
    callback: (data: OnPortraitCharacter) => void
  ) => void;
  emitStatusCharacter: (
    statusCharacter: EmitPortraitCharacter,
    callback: (data: EmitPortraitCharacter) => void
  ) => void;
  statusCharacterOff: (id: number) => void;
  onXPCharacter: (id: number, callback: (data: OnXPCharacter) => void) => void;
  emitXPCharacter: (
    xpCharacter: EmitXPCharacter,
    callback: (data: EmitXPCharacter) => void
  ) => void;
  xpCharacterOff: (id: number) => void;
  onInvite: (userId: number, callback: (data: OnInvite) => void) => void;
  emitInvite: (
    invite: EmitInvite,
    callback: (data: EmitInvite) => void
  ) => void;
  inviteOff: (userId: number) => void;
  onItem: (
    isSession: boolean,
    id: number,
    callback: (data: OnItem) => void
  ) => void;
  emitItem: (item: EmitItem, callback: () => void) => void;
  itemOff: (isSession: boolean, id: number) => void;
  onImage: (
    sessionId: number | null,
    callback: (data: OnImage) => void
  ) => void;
  emitImage: (image: EmitImage) => void;
  imageOff: (sessionId: number | null) => void;
  onCleanImage: (sessionId: number | null, callback: () => void) => void;
  emitCleanImage: (image: EmitCleanImage) => void;
  cleanImageOff: (sessionId: number | null) => void;
  onRollDice: (
    sessionId: number | null,
    characterId: number | null,
    callback: (data: OnRollDice) => void
  ) => void;
  emitRollDice: (rollDice: EmitRollDice) => void;
  rollDiceOff: (sessionId: number | null, characterId: number | null) => void;
  onAudioPlay: (
    sessionId: number,
    callback: (data: OnAudioPlayAndPause) => void
  ) => void;
  emitAudioPlay: (audioPlay: EmitAudioPlayAndPause) => void;
  audioPlayOff: (sessionId: number) => void;
  onAudioPause: (
    sessionId: number,
    callback: (data: OnAudioPlayAndPause) => void
  ) => void;
  emitAudioPause: (audioPause: EmitAudioPlayAndPause) => void;
  audioPauseOff: (sessionId: number) => void;
  onAudioVolume: (
    sessionId: number,
    callback: (data: OnAudioVolume) => void
  ) => void;
  emitAudioVolume: (audioVolume: EmitAudioVolume) => void;
  audioVolumeOff: (sessionId: number) => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socket = io(process.env.NEXT_PUBLIC_API_URL);

  function onStatusCharacter(
    id: number,
    callback: (data: OnPortraitCharacter) => void
  ) {
    socket.on(`status-character?${id}`, (data: OnPortraitCharacter) => {
      callback(data);
    });
  }

  function emitStatusCharacter(
    statusCharacter: EmitPortraitCharacter,
    callback: (data: EmitPortraitCharacter) => void
  ) {
    socket.emit('status-character', statusCharacter);
    callback(statusCharacter);
  }

  function statusCharacterOff(id: number) {
    socket.off(`status-character?${id}`);
  }

  function onXPCharacter(id: number, callback: (data: OnXPCharacter) => void) {
    socket.on(`xp?${id}`, (data: OnXPCharacter) => {
      callback(data);
    });
  }

  function emitXPCharacter(
    xpCharacter: EmitXPCharacter,
    callback: (data: EmitXPCharacter) => void
  ) {
    socket.emit('xp', xpCharacter);
    callback(xpCharacter);
  }

  function xpCharacterOff(id: number) {
    socket.off(`xp?${id}`);
  }

  function onInvite(userId: number, callback: (data: OnInvite) => void) {
    socket.on(`invite?${userId}`, (data: OnInvite) => {
      callback(data);
    });
  }

  function emitInvite(
    invite: EmitInvite,
    callback: (data: EmitInvite) => void
  ) {
    socket.emit('invite', invite);
    callback(invite);
  }

  function inviteOff(userId: number) {
    socket.off(`invite?${userId}`);
  }

  function onItem(
    isSession: boolean,
    id: number,
    callback: (data: EmitItem) => void
  ) {
    socket.on(`item?isSession=${isSession}?${id}`, (data) => {
      callback(data);
    });
  }

  function emitItem(item: EmitItem, callback: () => void) {
    socket.emit('item', item);
    callback();
  }

  function itemOff(isSession: boolean, id: number) {
    socket.off(`item?isSession=${isSession}?${id}`);
  }

  function onImage(
    sessionId: number | null,
    callback: (data: OnImage) => void
  ) {
    if (!sessionId) return;

    socket.on(`image?${sessionId}`, (data: OnImage) => {
      callback(data);
    });
  }

  function emitImage(image: EmitImage) {
    socket.emit('image', image);
  }

  function imageOff(sessionId: number | null) {
    if (!sessionId) return;

    socket.off(`image?${sessionId}`);
  }

  function onCleanImage(sessionId: number | null, callback: () => void) {
    if (!sessionId) return;

    socket.on(`clean-image?${sessionId}`, () => {
      callback();
    });
  }

  function emitCleanImage(image: EmitCleanImage) {
    socket.emit('clean-image', image);
  }

  function cleanImageOff(sessionId: number | null) {
    if (!sessionId) return;

    socket.off(`clean-image?${sessionId}`);
  }

  function onRollDice(
    sessionId: number | null,
    characterId: number | null,
    callback: (data: OnRollDice) => void
  ) {
    if (characterId) {
      socket.on(`roll-dice-character?${characterId}`, (data: OnRollDice) => {
        callback(data);
      });
    }

    if (sessionId) {
      socket.on(`roll-dice-session?${sessionId}`, (data: OnRollDice) => {
        callback(data);
      });
    }
  }

  function emitRollDice(rollDice: EmitRollDice) {
    socket.emit('roll-dice', rollDice);
  }

  function rollDiceOff(sessionId: number | null, characterId: number | null) {
    if (!sessionId && !characterId) return;

    if (!sessionId) {
      socket.off(`roll-dice?${characterId}`);
    }

    if (!characterId) {
      socket.off(`roll-dice?${sessionId}`);
    }
  }

  function onAudioPlay(
    userId: number,
    callback: (data: OnAudioPlayAndPause) => void
  ) {
    socket.on(`audio-play?${userId}`, (data: OnAudioPlayAndPause) => {
      callback(data);
    });
  }

  function emitAudioPlay(audioPlay: EmitAudioPlayAndPause) {
    socket.emit('audio-play', audioPlay);
  }

  function audioPlayOff(userId: number) {
    socket.off(`audio-play?${userId}`);
  }

  function onAudioPause(
    userId: number,
    callback: (data: OnAudioPlayAndPause) => void
  ) {
    socket.on(`audio-pause?${userId}`, (data: OnAudioPlayAndPause) => {
      callback(data);
    });
  }

  function emitAudioPause(audioPause: EmitAudioPlayAndPause) {
    socket.emit('audio-pause', audioPause);
  }

  function audioPauseOff(userId: number) {
    socket.off(`audio-pause?${userId}`);
  }

  function onAudioVolume(
    userId: number,
    callback: (data: OnAudioVolume) => void
  ) {
    socket.on(`audio-volume?${userId}`, (data: OnAudioVolume) => {
      callback(data);
    });
  }

  function emitAudioVolume(audioVolume: EmitAudioVolume) {
    socket.emit('audio-volume', audioVolume);
  }

  function audioVolumeOff(userId: number) {
    socket.off(`audio-volume?${userId}`);
  }

  return (
    <SocketContext.Provider
      value={{
        onStatusCharacter,
        emitStatusCharacter,
        statusCharacterOff,
        onXPCharacter,
        emitXPCharacter,
        xpCharacterOff,
        onInvite,
        emitInvite,
        inviteOff,
        onItem,
        emitItem,
        itemOff,
        onImage,
        emitImage,
        imageOff,
        onCleanImage,
        emitCleanImage,
        cleanImageOff,
        onRollDice,
        emitRollDice,
        rollDiceOff,
        onAudioPlay,
        emitAudioPlay,
        audioPlayOff,
        onAudioPause,
        emitAudioPause,
        audioPauseOff,
        onAudioVolume,
        emitAudioVolume,
        audioVolumeOff,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
