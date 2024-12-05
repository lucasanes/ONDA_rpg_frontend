export interface InventoryInterface {
  id: number;
  name: string;
  description: string;
  weight: number;
  image: string;
  sessionId?: number;
  characterId?: number;
}
