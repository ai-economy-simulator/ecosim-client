"use client";

import { Spinner, useToastController } from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";
import { GameContext } from "../gameContext";
import { joinOrCreateGameRoom } from "@/app/services/game";
import { Player, RestartRoomState } from "@/app/interfaces/gameRoomState";
import CustomUseUser from "@/app/components/customUseUser";
import GameLobby from "@/app/components/gameLobby";
import Game from "@/app/components/game";
import { toast } from "@/app/services/toast";

// This component relies on an already created game client
export default function GameRoom({ params }: { params: { gameCode: string } }) {
  const { user } = CustomUseUser();
  const router = useRouter();
  const { dispatchToast } = useToastController("toaster");

  const { gameContext, setGameContext } = useContext(GameContext);

  // This useEffect connects to an already existing room ID for users directly landing on route /game/[gameCode]
  useEffect(() => {
    if (gameContext && gameContext.client && user) {
      if (!gameContext.room) {
        console.log("Attempting to join room with ID: ", params.gameCode);
        joinOrCreateGameRoom(gameContext.client, user, params.gameCode)
          .then((room) => {
            console.log("Connected to room successfully. ", room);
            setGameContext((prev) => {
              return { ...prev, room: room, gameCode: room.id };
            });

            // This is a hack to force re-render of component
            // See if this is really required or is there some better way?
            room.onStateChange((_: RestartRoomState) => {
              setGameContext((prev) => {
                return { ...prev };
              });
            });

            room.onLeave((code) => {
              console.error("Client left the room. Error: ", code);
              toast(
                dispatchToast,
                `Unable to connect to server. Error: ${code}.`,
                "error",
                -1,
              );
            });
          })
          .catch((err) => {
            // How to get room capacity is full or room does not exist? Check if valid game code when someone directly comes on this URL
            // how to use Next.js errors
            console.error("Unable to connect to server. ", err);
            toast(
              dispatchToast,
              "Unable to connect to server. Please try again later.",
              "error",
            );
          });
      }
    }
  }, [gameContext?.client]);

  if (gameContext?.room) {
    if (!gameContext.room.state.isGameStarted) {
      return <GameLobby gameCode={params.gameCode} gameContext={gameContext} />;
    } else {
      return <Game gameCode={params.gameCode} gameContext={gameContext} />;
    }
  }

  return (
    <>
      <Spinner />
    </>
  );
}
