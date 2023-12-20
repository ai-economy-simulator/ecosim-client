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
  // Replace this with swr request or not? Refer swr vercel docs
  const res = await fetch("/api/protected/access");
  if (!res.ok) {
    console.error("Unable to get access token.");
    // throw error here
  }
  const { accessToken }: { accessToken: string } = await res.json();

  const gameJoinOptions = {
    playerName: user.name,
    email: user.email,
    avatar: user.picture,
    accessToken: accessToken,
  };

  if (gameCode) {
    return client.joinById<RestartRoomState>(gameCode, gameJoinOptions);
  }
  return client.create<RestartRoomState>("restart_room", gameJoinOptions);
};

export { joinOrCreateGameRoom };
