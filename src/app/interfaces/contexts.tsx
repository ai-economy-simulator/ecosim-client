import * as Colyseus from "colyseus.js";

export interface GameContextData {
  client: Colyseus.Client | undefined;
  room: Colyseus.Room | undefined;
  gameCode: string | undefined;
}
