import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

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

interface SocketContextValue {
  onStatusCharacter: (
    id: number,
    callback: (data: OnPortraitCharacter) => void
  ) => void;
  updateStatusCharacter: (
    statusCharacter: EmitPortraitCharacter,
    callback: (data: EmitPortraitCharacter) => void
  ) => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  function onStatusCharacter(
    id: number,
    callback: (data: OnPortraitCharacter) => void
  ) {
    socket?.on(`status-character?${id}`, (data: OnPortraitCharacter) => {
      callback(data);
    });
  }

  function updateStatusCharacter(
    statusCharacter: EmitPortraitCharacter,
    callback: (data: EmitPortraitCharacter) => void
  ) {
    callback(statusCharacter);
    socket?.emit('status-character', statusCharacter);
  }

  return (
    <SocketContext.Provider
      value={{
        onStatusCharacter,
        updateStatusCharacter,
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
