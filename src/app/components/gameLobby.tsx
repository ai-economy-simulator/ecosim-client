import {
  Body1,
  Button,
  Divider,
  InfoLabel,
  LargeTitle,
  Persona,
  Switch,
  useToastController,
} from "@fluentui/react-components";
import styles from "../page.module.css";
import { mapToArray } from "../services/conversions";
import { Player } from "../interfaces/gameRoomState";
import {
  MessageTypes,
  PlayerReadyMessageData,
  StartGameMessageData,
} from "../interfaces/serverMessages";
import {
  Copy24Regular,
  AirplaneTakeOff24Filled,
  AirplaneTakeOff24Regular,
} from "@fluentui/react-icons";
import { useContext, useMemo } from "react";
import { GameContext } from "../game/gameContext";
import { GameContextData } from "../interfaces/contexts";
import { PLAYER_AVATAR_SIZE } from "../constants";
import { toast } from "../services/toast";

export default function GameLobby({
  gameCode,
  gameContext,
}: {
  gameCode: string;
  gameContext: GameContextData;
}) {
  const { dispatchToast } = useToastController("toaster");

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

  if (gameContext.room) {
    return (
      <>
        <div className={styles.flexcontainer} style={{ flexFlow: "column" }}>
          <div className={styles.flexitemmargin} style={{ height: "20vh" }}>
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
                          {gameCode}
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
                                `I'm inviting you to join my Restart. game! Use the code ${gameCode} or link ${window.location.href} to join.`,
                              )
                              .then(() => {
                                toast(
                                  dispatchToast,
                                  "Copied to clipboard",
                                  "success",
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
                    <div
                      className={styles.flexcontainer}
                      style={{ alignItems: "start" }}
                    >
                      {mapToArray(
                        gameContext.room.state.players,
                        (_: string, player: Player, idx: number) => {
                          return (
                            <div
                              className={styles.flexitemmargin}
                              style={{ marginRight: "16px" }}
                              key={player.playerID}
                            >
                              <Persona
                                avatar={{
                                  name: player.playerName,
                                  image: { src: player.avatar },
                                  title: player.playerName,
                                  size: PLAYER_AVATAR_SIZE,
                                  color: "colorful",
                                }}
                                textPosition="below"
                                size="medium"
                                primaryText={
                                  player.isReady ? "Ready" : "Waiting"
                                }
                                secondaryText={
                                  gameContext.room?.state.gameAdmin ===
                                  player.playerID
                                    ? "Game Admin"
                                    : ""
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
                <Button
                  appearance="primary"
                  size="large"
                  icon={<AirplaneTakeOff24Filled />}
                  onClick={() => {
                    const startGameMessage: StartGameMessageData = {
                      startGame: true,
                    };
                    gameContext.room?.send(
                      MessageTypes.startGame,
                      startGameMessage,
                    );
                  }}
                >
                  Start Game
                </Button>
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
}
