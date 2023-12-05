import * as Colyseus from "colyseus.js";
import { RestartRoomState } from "./gameRoomState";

export interface GameContextData {
  client: Colyseus.Client | undefined;
  room: Colyseus.Room<RestartRoomState> | undefined;
  gameCode: string | undefined;
}
