import { Schema, Context, MapSchema, type } from "@colyseus/schema";

export class Player extends Schema {
  playerName: string | undefined;
  avatar: string | undefined;
  isReady: boolean = false;

  // make email private. Can we remove this from here?
  email: string | undefined;

  constructor({
    playerName,
    avatar,
    email,
  }: {
    playerName: string | undefined;
    avatar: string | undefined;
    email: string | undefined;
  }) {
    super();
    this.playerName = playerName;
    this.avatar = avatar;
    this.email = email;
  }
}

export class RestartRoomState extends Schema {
  // World states
  stockPrice: number = 100;
  activePlayer: string | null = null;
  isGameStarted: boolean = false;
  gameAdmin: string | null = null;

  players = new MapSchema<Player>();
}
