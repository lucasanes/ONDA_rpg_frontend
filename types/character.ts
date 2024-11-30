export interface CharactersInterface {
  id: number;
  name: string;
  xp: number;
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  to: number;
  ts: number;
  tp: number;
  mun: number;
  portrait: string | null;
  munA: number;
  sessionId?: number;
  sessionName?: string;
  userId: number;
  isPublic: boolean;
}

export interface CharacterPortraitInterface {
  id: number;
  name: string;
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  money: number;
  portrait: string | null;
  sessionId?: number;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  munA: number;
  hurted: boolean;
  userId: number;
  isPublic: boolean;
}

export interface CharacterInterface {
  id: number;
  sessionId?: number;
  userId: number;
  isPublic: boolean;
}

export interface MainCharacterInterface {
  name: string;
  class: string;
  race: string;
  age: number;
  divinity: string;
  xp: number;
  to: number;
  ts: number;
  tp: number;
}

export interface StatusCharacterInterface {
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  mun: number;
  portrait: string | null;
  cd: number;
  defense: number;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  munA: number;
  hurted: boolean;
}

export interface SessionCharactersInterface {
  id: number;
  userId: number;
  isPublic: boolean;
  name: string;
  age: number;
  portrait: string | null;
  xp: number;
  class: string;
  race: string;
  divinity: string;
  pvA: number;
  pmA: number;
  munA: number;
  pv: number;
  pm: number;
  mun: number;
  ts: number;
  tp: number;
  to: number;
  cd: number;
  defense: number;
}
