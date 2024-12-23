export interface CharactersInterface {
  id: number;
  name: string;
  xp: number;
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  to: number;
  tp: number;
  tc: number;
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
  weightLimit: number;
  xp: number;
  to: number;
  tp: number;
  tc: number;
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
  money?: number;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  xp: number;
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
  statusCharacter: StatusCharacterInterface;
  mainCharacter: MainCharacterInterface;
}
