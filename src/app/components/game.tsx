import {
  Button,
  Persona,
  Subtitle2Stronger,
  Text,
} from "@fluentui/react-components";
import { GameContextData } from "../interfaces/contexts";
import { Player } from "../interfaces/gameRoomState";
import styles from "../page.module.css";
import { mapToArray } from "../services/conversions";
import {
  PLAYER_ARRANGEMENT_ELLIPSE_MAJOR,
  PLAYER_ARRANGEMENT_ELLIPSE_MINOR,
  PLAYER_AVATAR_SIZE,
} from "../constants";
import { EndTurnMessageData, MessageTypes } from "../interfaces/serverMessages";

export default function Game({
  gameCode,
  gameContext,
}: {
  gameContext: GameContextData;
  gameCode: string;
}) {
  return (
    <>
      <div
        className={styles.flexcontainer}
        style={{
          justifyContent: "space-between",
          flexFlow: "column wrap",
          height: "85vh",
        }}
      >
        <div className={styles.flexitemmargin}>
          <div>Header</div>
        </div>
        <div className={styles.flexitemmargin} style={{ position: "relative" }}>
          {gameContext.room &&
            mapToArray(
              gameContext.room.state.players,
              (playerID: string, player: Player, idx: number) => {
                if (gameContext.room?.state.players.size) {
                  return (
                    <div
                      key={playerID}
                      style={{
                        position: "absolute",
                        display: "inline",
                        left:
                          -PLAYER_ARRANGEMENT_ELLIPSE_MAJOR *
                          Math.cos(
                            (2 * Math.PI * idx) /
                              gameContext.room?.state.players.size,
                          ),
                        top:
                          -PLAYER_ARRANGEMENT_ELLIPSE_MINOR *
                          Math.sin(
                            (2 * Math.PI * idx) /
                              gameContext.room?.state.players.size,
                          ),
                      }}
                    >
                      <Persona
                        avatar={{
                          name: player.playerName,
                          image: { src: player.avatar },
                          title: player.playerName,
                          size: PLAYER_AVATAR_SIZE,
                          color: "colorful",
                          activeAppearance: "ring-shadow",
                          active:
                            gameContext.room.state.activePlayer === playerID
                              ? "active"
                              : "inactive",
                        }}
                        textPosition="below"
                        size="medium"
                        primaryText={
                          gameContext.room.sessionId === playerID ? (
                            <Subtitle2Stronger>You</Subtitle2Stronger>
                          ) : (
                            player.playerName
                          )
                        }
                      />
                    </div>
                  );
                }
              },
            )}
        </div>
        <div className={styles.flexitemmargin}>
          {gameContext.room?.sessionId ===
          gameContext.room?.state.activePlayer ? (
            <Button
              onClick={() => {
                const endTurnMessage: EndTurnMessageData = {
                  endTurn: true,
                };
                gameContext.room?.send(MessageTypes.endTurn, endTurnMessage);
              }}
            >
              End Turn
            </Button>
          ) : (
            <>
              <Text>.</Text>
            </>
          )}
        </div>
      </div>
    </>
  );
}
