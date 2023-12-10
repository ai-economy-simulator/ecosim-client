"use client";

import { useRouter } from "next/navigation";
import { fetcher } from "../services/fetcher";
import { useContext, useEffect, useState } from "react";
import { Spinner, useToastController } from "@fluentui/react-components";
import { GameContext } from "./gameContext";
import CustomToaster from "../components/toaster";
import { joinOrCreateGameRoom } from "../services/game";
import { RestartRoomState } from "../interfaces/gameRoomState";
import {
  MessageTypes,
  SetGameAdminMessageData,
} from "../interfaces/serverMessages";
import CustomUseUser from "../components/customUseUser";

// This component relies on an already created game client and creates a new room for user landing on route /game
export default function CreateGame() {
  const { user } = CustomUseUser();
  const router = useRouter();
  const { gameContext, setGameContext } = useContext(GameContext);
  const { dispatchToast } = useToastController("toaster");
  const [loading] = useState(true);

  useEffect(() => {
    if (gameContext && gameContext.client && user) {
      console.log("Attempting to join restart_room...");
      // add game room state schema here
      joinOrCreateGameRoom(gameContext.client, user, undefined)
        .then((room) => {
          console.log("Connected to room successfully. ", room);
          setGameContext({ ...gameContext, room: room, gameCode: room.id });

          const setGameAdminMessage: SetGameAdminMessageData = {
            playerID: room.sessionId,
          };
          // Protect this so that unauthorized users cannot send this message
          room.send(MessageTypes.setGameAdmin, setGameAdminMessage);

          room.onStateChange((state: RestartRoomState) => {
            setGameContext((prev) => {
              return { ...prev };
            });
          });

          router.push(`/game/${room.id}`);
        })
        .catch((err) => {
          // how to use Next.js errors
          console.error("Unable to connect to server. ", err);
          dispatchToast(
            <CustomToaster text="Unable to connect to server. Please try again later." />,
            { intent: "error" },
          );
        });
    }
    // how many times does this run? Does this also run when we use setGameContext()?
  }, [gameContext?.client]);

  // return loading spinner here
   return loading ? (
    <Spinner label="Loading..." size="huge" />
  ) : null;
}
