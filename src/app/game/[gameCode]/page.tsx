"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../../page.module.css";
import {
  Body1,
  Button,
  InfoLabel,
  LargeTitle,
  Spinner,
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

// This component relies on an already created game client
export default function Game({ params }: { params: { gameCode: string } }) {
  const { user } = useUser();
  const router = useRouter();
  const { dispatchToast } = useToastController("toaster");

  const { gameContext, setGameContext } = useContext(GameContext);

  const getAllPlayers = useMemo(() => {
    if (gameContext && gameContext.room) {
      return mapToArray(
        gameContext.room.state.players,
        (_: string, value: Player) => {
          return (
            <div className={styles.flexitemmargin}>
              <Text>{value.playerName}</Text>
            </div>
          );
        },
      );
    }
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

            room.onStateChange((state: RestartRoomState) => {
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
          <div className={styles.flexitemmargin} style={{ height: "10vh" }}>
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
                <div className={styles.flexcontainer}>
                  {/* display avatar of each player here */}
                  {getAllPlayers}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.flexitemmargin}>Sectors</div>
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

export { Game };
