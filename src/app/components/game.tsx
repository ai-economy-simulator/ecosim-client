import { Persona } from "@fluentui/react-components";
import { GameContextData } from "../interfaces/contexts";
import { Player } from "../interfaces/gameRoomState";
import styles from "../page.module.css";
import { mapToArray } from "../services/conversions";

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
        style={{ justifyContent: "center" }}
      >
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
                          -400 *
                          Math.cos(
                            (2 * Math.PI * idx) /
                              gameContext.room?.state.players.size,
                          ),
                        top:
                          -225 *
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
                          size: 56,
                          color: "colorful",
                        }}
                        textPosition="below"
                        size="medium"
                      />
                    </div>
                  );
                }
              },
            )}
        </div>
      </div>
    </>
  );
}
