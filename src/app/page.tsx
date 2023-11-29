"use client";

import {
  BrainCircuit20Filled,
  BrainCircuit24Filled,
  Keyboard24Filled,
} from "@fluentui/react-icons";
import styles from "./page.module.css";
import {
  Body1,
  Body1Strong,
  Body2,
  Button,
  FluentProvider,
  Image,
  Input,
  LargeTitle,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useState } from "react";

export default function Home() {
  const [gameToJoinCode, setGameToJoinCode] = useState("");

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <main>
          <div
            className={styles.flexcontainer}
            style={{
              flexFlow: "row wrap-reverse",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <div className={styles.flexitemmargin}>
              <div
                className={styles.flexcontainer}
                style={{ flexDirection: "column", alignItems: "start" }}
              >
                <div className={styles.flexitemmargin}>
                  <LargeTitle>
                    Is it easy <br />
                    building a business?
                  </LargeTitle>
                </div>
                <div className={styles.flexitemmargin}>
                  <div
                    className={styles.flexcontainer}
                    style={{ flexFlow: "row wrap" }}
                  >
                    <div className={styles.flexitemmargin}>
                      <Button
                        appearance="primary"
                        size="large"
                        icon={<BrainCircuit24Filled />}
                      >
                        New Game
                      </Button>
                    </div>
                    <div
                      className={styles.flexitemmargin}
                      style={{ margin: "0px 12px" }}
                    >
                      <Body2>or</Body2>
                    </div>
                    <div className={styles.flexitemmargin}>
                      <Input
                        value={gameToJoinCode}
                        size="large"
                        contentBefore={<Keyboard24Filled />}
                        placeholder="Enter game code"
                        onChange={(_, val) => {
                          setGameToJoinCode(val.value);
                        }}
                      />
                    </div>
                    <div className={styles.flexitemmargin}>
                      <Button
                        appearance="subtle"
                        size="large"
                        disabled={gameToJoinCode === "" ? true : false}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles.flexitemmargin}
              style={{ height: "25rem", width: "25rem" }}
            >
              <Image src="/cities_pixel.jpg" fit="cover" shape="circular" />
            </div>
          </div>
        </main>
      </FluentProvider>
    </>
  );
}
