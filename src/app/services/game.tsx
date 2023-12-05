import { UserProfile } from "@auth0/nextjs-auth0/client";
import { GameContextData } from "../interfaces/contexts";
import { Client } from "colyseus.js";
import { RestartRoomState } from "../interfaces/gameRoomState";

// this joining existing room
const joinOrCreateGameRoom = async (
  client: Client,
  user: UserProfile,
  gameCode: string | undefined,
) => {
  const gameJoinOptions = {
    playerName: user.name,
    email: user.email,
    avatar: user.picture,
  };
  if (gameCode) {
    return client.joinById<RestartRoomState>(gameCode, gameJoinOptions);
  }
  return client.joinOrCreate<RestartRoomState>("restart_room", gameJoinOptions);
};

export { joinOrCreateGameRoom };
