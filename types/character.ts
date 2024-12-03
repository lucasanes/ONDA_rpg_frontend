export interface CharactersInterface {
  id: number;
  name: string;
  xp: number;
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  to: number;
  ts: number;
  tp: number;
  mun: number;
  portrait: string | null;
  currentMun: number;
  sessionId?: number;
  sessionName?: string;
  userId: number;
  isPublic: boolean;
}

export interface CharacterPortraitInterface {
  id: number;
  name: string;
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  money: number;
  portrait: string | null;
  sessionId?: number;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  currentMun: number;
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
  origin: string;
  divinity: string;
  xp: number;
  to: number;
  ts: number;
  tp: number;
}

export interface StatusCharacterInterface {
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  mun: number;
  portrait: string | null;
  cd: number;
  defense: number;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  currentMun: number;
  hurted: boolean;
}

export interface StatusBarCharacterInterface {
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  mun: number;
  currentMun: number;
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
  origin: string;
  currentHp: number;
  currentMp: number;
  currentMun: number;
  hp: number;
  mp: number;
  mun: number;
  ts: number;
  tp: number;
  to: number;
  cd: number;
  defense: number;
}
