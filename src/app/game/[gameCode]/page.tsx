"use client";

import styles from "../../page.module.css";
import {
  Avatar,
  Body1,
  Button,
  Divider,
  InfoLabel,
  LargeTitle,
  Persona,
  Spinner,
  Switch,
  Text,
  useToastController,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import {
  Copy24Regular,
  AirplaneTakeOff24Filled,
  AirplaneTakeOff24Regular,
} from "@fluentui/react-icons";
import CustomToaster from "@/app/components/toaster";
import { useContext, useEffect, useMemo } from "react";
import { GameContext } from "../gameContext";
import { joinOrCreateGameRoom } from "@/app/services/game";
import { Player, RestartRoomState } from "@/app/interfaces/gameRoomState";
import { mapToArray } from "@/app/services/conversions";
import {
  MessageTypes,
  PlayerReadyMessageData,
  StartGameMessageData,
} from "@/app/interfaces/serverMessages";
import CustomUseUser from "@/app/components/customUseUser";
import GameLobby from "@/app/components/gameLobby";

// This component relies on an already created game client
export default function Game({ params }: { params: { gameCode: string } }) {
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
          })
          .catch((err) => {
            // How to get room capacity is full or room does not exist? Check if valid game code when someone directly comes on this URL
            // how to use Next.js errors
            console.error("Unable to connect to server. ", err);
            dispatchToast(
              <CustomToaster text="Unable to connect to server. Please try again later." />,
              { intent: "error" },
            );
          });
      }
    }
  }, [gameContext?.client]);

  if (gameContext?.room) {
    if (!gameContext.room.state.isGameStarted) {
      return <GameLobby gameCode={params.gameCode} gameContext={gameContext} />;
    } else {
      return <Spinner />;
    }
  }

  return (
    <>
      <Spinner />
    </>
  );
}
