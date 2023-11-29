"use client";

import styles from "../page.module.css";
import NextLink from "next/link";
import {
  FluentProvider,
  Link,
  teamsLightTheme,
} from "@fluentui/react-components";
import { Text } from "@fluentui/react-text";

const Footer = () => {
  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <div className={styles.flexcontainer} style={{ flexFlow: "row wrap" }}>
          <div className={styles.flexitemmargin}>
            <NextLink href="/" passHref legacyBehavior>
              <Link appearance="subtle">Privacy Policy</Link>
            </NextLink>
          </div>
        </div>
      </FluentProvider>
    </>
  );
};

export { Footer };
