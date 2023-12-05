import { UserProfile } from "@auth0/nextjs-auth0/client";
import { GameContextData } from "../interfaces/contexts";
import { Client } from "colyseus.js";

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
  console.log(user.name, "is joining");
  if (gameCode) {
    return client.joinById(gameCode, gameJoinOptions);
  }
  return client.joinOrCreate("restart_room", gameJoinOptions);
};

export { joinOrCreateGameRoom };
