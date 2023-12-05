"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../../page.module.css";
import {
  Body1,
  Button,
  InfoLabel,
  LargeTitle,
  Text,
  useToastController,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import { Copy24Regular } from "@fluentui/react-icons";
import CustomToaster from "@/app/components/toaster";
import { useContext, useEffect } from "react";
import { GameContext } from "../gameContext";

// This component relies on an already created game client
export default function Game({ params }: { params: { gameCode: string } }) {
  const router = useRouter();
  const { dispatchToast } = useToastController("toaster");

  const { gameContext, setGameContext } = useContext(GameContext);

  // This useEffect connects to an already existing room ID for users direcly landing on route /game/[gameCode]
  useEffect(() => {
    if (gameContext && gameContext.client) {
      if (!gameContext.room) {
        console.log("Attempting to join room with ID: ", params.gameCode);
        gameContext.client
          .joinById(params.gameCode)
          .then((room) => {
            console.log("Connected to room successfully. ", room);
            setGameContext({ ...gameContext, room: room, gameCode: room.id });
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

  // Show this UI only if user connected to room successfully
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
                    info={"Share this code with others to allow them to join."}
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
            <div className={styles.flexitemmargin}>Other Players</div>
          </div>
        </div>
        <div className={styles.flexitemmargin}>Sectors</div>
      </div>
    </>
  );
}

export { Game };
