type Session = {
  players: string[];
  name: string;
  description: string;
};

export interface InviteInterface {
  id: number;
  sessionId: number;
  session: Session;
}
