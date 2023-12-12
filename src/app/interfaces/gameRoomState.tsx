import { Schema, Context, MapSchema, type } from "@colyseus/schema";

export class PlayerPrivate extends Schema {
  email: string | undefined = undefined;
}

export class Player extends Schema {
  playerName: string | undefined = undefined;
  avatar: string | undefined = undefined;
  isReady: boolean = false;
  playerID: string | null = null;

  private: PlayerPrivate | undefined = undefined;
}

export class RestartRoomState extends Schema {
  // World states
  stockPrice: number = 100;

  // Game Environment States
  activePlayer: string | null = null;
  isGameStarted: boolean = false;
  gameAdmin: string | null = null;

  players = new MapSchema<Player>();
}
