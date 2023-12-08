"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
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
import { Copy24Regular } from "@fluentui/react-icons";
import CustomToaster from "@/app/components/toaster";
import { useContext, useEffect, useMemo } from "react";
import { GameContext } from "../gameContext";
import { joinOrCreateGameRoom } from "@/app/services/game";
import { Player, RestartRoomState } from "@/app/interfaces/gameRoomState";
import { mapToArray } from "@/app/services/conversions";
import {
  MessageTypes,
  PlayerReadyMessageData,
} from "@/app/interfaces/serverMessages";

// This component relies on an already created game client
export default function Game({ params }: { params: { gameCode: string } }) {
  const { user } = useUser();
  const router = useRouter();
  const { dispatchToast } = useToastController("toaster");

  const { gameContext, setGameContext } = useContext(GameContext);

  const allPlayerReady = useMemo(() => {
    if (gameContext && gameContext.room) {
      for (const player of gameContext.room.state.players.values()) {
        if (!player.isReady) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, [JSON.stringify(gameContext?.room?.state.players)]);

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
    return (
      <>
        <div className={styles.flexcontainer} style={{ flexFlow: "column" }}>
          <div className={styles.flexitemmargin} style={{ height: "15vh" }}>
            <div className={styles.flexcontainer} style={{ flexFlow: "row" }}>
              <div className={styles.flexitemmargin}>
                <div
                  className={styles.flexcontainer}
                  style={{ flexFlow: "column" }}
                >
                  <div className={styles.flexitemmargin}>
                    <Body1>Game Code</Body1>
                    <InfoLabel
                      info={
                        "Share this code with others to allow them to join."
                      }
                    />
                  </div>
                  <div className={styles.flexitemmargin}>
                    <div
                      className={styles.flexcontainer}
                      style={{ flexFlow: "row" }}
                    >
                      <div className={styles.flexitemmargin}>
                        <LargeTitle style={{ letterSpacing: "12px" }}>
                          {params.gameCode}
                        </LargeTitle>
                      </div>
                      <div className={styles.flexitemmargin}>
                        <Button
                          icon={<Copy24Regular />}
                          title="Copy to Clipboard"
                          appearance="subtle"
                          onClick={() => {
                            navigator.clipboard
                              .writeText(
                                `I'm inviting you to join my Restart. game! Use the code ${params.gameCode} or link ${window.location.href} to join.`,
                              )
                              .then(() => {
                                dispatchToast(
                                  <CustomToaster text="Copied to clipboard" />,
                                  { intent: "success" },
                                );
                              })
                              .catch((err) => {
                                console.error(
                                  "Unable to copy to clipboard: ",
                                  err,
                                );
                              });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.flexitemmargin}>
                <Divider vertical appearance="brand" />
              </div>
              <div className={styles.flexitemmargin}>
                <div
                  className={styles.flexcontainer}
                  style={{ flexFlow: "column", alignItems: "start" }}
                >
                  <div className={styles.flexitemmargin}>
                    <Body1>Connected Players</Body1>
                  </div>
                  <div className={styles.flexitemmargin}>
                    <div className={styles.flexcontainer}>
                      {mapToArray(
                        gameContext.room.state.players,
                        (_: string, player: Player) => {
                          return (
                            <div
                              className={styles.flexitemmargin}
                              style={{ marginRight: "16px" }}
                            >
                              <Persona
                                avatar={{
                                  name: player.playerName,
                                  image: { src: player.avatar },
                                  title: player.playerName,
                                  size: 56,
                                }}
                                textPosition="below"
                                size="medium"
                                primaryText={
                                  player.isReady ? "Ready" : "Waiting"
                                }
                                presence={{
                                  status: player.isReady ? "available" : "away",
                                }}
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flexitemmargin}>
            <Switch
              label="Ready"
              checked={
                gameContext.room.state.players.get(gameContext.room.sessionId)
                  ?.isReady
              }
              onChange={(_, checked) => {
                const playerReadyMessageData: PlayerReadyMessageData = {
                  playerReady: checked.checked,
                };
                gameContext.room?.send(
                  MessageTypes.playerReady,
                  playerReadyMessageData,
                );
              }}
            />
          </div>
          <div className={styles.flexitemmargin}>
            {allPlayerReady ? (
              gameContext.room.state.gameAdmin ===
              gameContext.room.sessionId ? (
                <Button>Start Game</Button>
              ) : (
                <Body1>Waiting for game admin to start</Body1>
              )
            ) : (
              <Body1>Waiting for everyone to get ready</Body1>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Spinner />
    </>
  );
}
