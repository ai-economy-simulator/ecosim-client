"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../../page.module.css";
import {
  Body1,
  Button,
  InfoLabel,
  LargeTitle,
  Text,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import { Copy24Regular } from "@fluentui/react-icons";

export default function Game({ params }: { params: { gameCode: string } }) {
  const { user } = useUser();
  const router = useRouter();

  // check if valid game code if someone directly comes on this URL

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
                          navigator.clipboard.writeText(
                            `I'm inviting you to join my Restart. game! Use the code ${params.gameCode} to join.`,
                          );
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
