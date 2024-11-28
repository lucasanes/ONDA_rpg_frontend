export interface CharacterInterface {
  id: number;
  name: string;
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  portrait: string | null;
}

export interface CharacterPortraitInterface {
  id: number;
  name: string;
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  fight: boolean;
  unconscious: boolean;
  tired: boolean;
  dying: boolean;
  portrait: string | null;
}
