"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { fetcher } from "../services/fetcher";
import { useContext, useEffect, useState } from "react";
import { Spinner, useToastController } from "@fluentui/react-components";
import { GameContext } from "./gameContext";
import CustomToaster from "../components/toaster";
import { joinOrCreateGameRoom } from "../services/game";

// This component relies on an already created game client and creates a new room for user landing on route /game
export default function CreateGame() {
  const { user } = useUser();
  const router = useRouter();
  const { gameContext, setGameContext } = useContext(GameContext);
  const { dispatchToast } = useToastController("toaster");

  useEffect(() => {
    if (gameContext && gameContext.client && user) {
      console.log("Attempting to join restart_room...");
      // add game room state schema here
      joinOrCreateGameRoom(gameContext.client, user, undefined)
        .then((room) => {
          console.log("Connected to room successfully. ", room);
          setGameContext({ ...gameContext, room: room, gameCode: room.id });
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
  return;
}
