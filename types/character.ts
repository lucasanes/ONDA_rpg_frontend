export interface CharacterInterface {
  id: number;
  name: string;
  pv: number;
  pvA: number;
  pm: number;
  pmA: number;
  money: number;
  portrait: string | null;
  sessionId?: number;
}
