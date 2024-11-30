'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type DisabledContextType = {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
};

const DisabledContext = createContext<DisabledContextType | undefined>(
  undefined
);

export const DisabledProvider = ({ children }: { children: ReactNode }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <DisabledContext.Provider value={{ disabled, setDisabled }}>
      {children}
    </DisabledContext.Provider>
  );
};

export const useDisabled = () => {
  const context = useContext(DisabledContext);

  if (!context) {
    throw new Error('useDisabled must be used within a UserProvider');
  }

  return context;
};
