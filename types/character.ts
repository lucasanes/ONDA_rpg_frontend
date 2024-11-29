export interface CharactersInterface {
  id: number;
  name: string;
  level: number;
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
}

export interface CharacterInterface {
  id: number;
  name: string;
  class: string;
  race: string;
  level: number;
  divinity: string;
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
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  fighting: boolean;
  munA: number;
  hurted: boolean;
  sessionId?: number;
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
}
