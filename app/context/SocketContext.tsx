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

interface SocketContextValue {
  onStatusCharacter: (
    id: number,
    callback: (data: OnPortraitCharacter) => void
  ) => void;
  emitStatusCharacter: (
    statusCharacter: EmitPortraitCharacter,
    callback: (data: EmitPortraitCharacter) => void
  ) => void;
  onInvite: (userId: number, callback: (data: OnInvite) => void) => void;
  emitInvite: (
    invite: EmitInvite,
    callback: (data: EmitInvite) => void
  ) => void;
  onItem: (
    isSession: boolean,
    id: number,
    callback: (data: OnItem) => void
  ) => void;
  emitItem: (item: EmitItem, callback: () => void) => void;
  onImage: (
    sessionId: number | null,
    callback: (data: OnImage) => void
  ) => void;
  emitImage: (image: EmitImage) => void;
  onCleanImage: (sessionId: number | null, callback: () => void) => void;
  emitCleanImage: (image: EmitCleanImage) => void;
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

  function onCleanImage(sessionId: number | null, callback: () => void) {
    if (!sessionId) return;

    socket.on(`clean-image?${sessionId}`, () => {
      callback();
    });
  }

  function emitCleanImage(image: EmitCleanImage) {
    socket.emit('clean-image', image);
  }

  return (
    <SocketContext.Provider
      value={{
        onStatusCharacter,
        emitStatusCharacter,
        onInvite,
        emitInvite,
        onItem,
        emitItem,
        onImage,
        emitImage,
        onCleanImage,
        emitCleanImage,
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
