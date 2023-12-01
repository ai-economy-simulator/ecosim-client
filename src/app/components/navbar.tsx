"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../page.module.css";
import { SignOut20Regular } from "@fluentui/react-icons";
import {
  Avatar,
  Button,
  FluentProvider,
  Image,
  LargeTitle,
  Link,
  Menu,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  Title1,
  Title2,
  teamsLightTheme,
} from "@fluentui/react-components";

const Navbar = () => {
  const { user, error } = useUser();

  return (
    <>
      <FluentProvider theme={teamsLightTheme}>
        <div
          className={styles.flexcontainer}
          style={{
            width: "100%",
            height: "64px",
            flexFlow: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              className={styles.flexcontainer}
              style={{ marginLeft: "8px", flexFlow: "row", height: "48px" }}
            >
              <div className={styles.flexitemmargin} style={{ height: "48px" }}>
                <Image src="/logo.png" alt="Restart Logo" fit="contain"></Image>
              </div>
              <div className={styles.flexitemmargin}>
                <Title2>Restart.</Title2>
              </div>
            </div>
          </div>
          <div>
          <div
              className={styles.flexcontainer}
              style={{ marginRight: "8px", flexFlow: "row", height: "48px" }}
            >
              <div className={styles.flexitemmargin} style={{ height: "48px" }}>
            {user ? (
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    appearance="transparent"
                    size="large"
                    icon={
                      <Avatar
                        name={user.name ? user.name : "Name NA"}
                        color="colorful"
                        size={36}
                        image={{ src: user.picture ? user.picture : "" }}
                      />
                    }
                  ></Button>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItemLink
                      href="/api/auth/logout"
                      icon={<SignOut20Regular />}
                    >
                      Logout
                    </MenuItemLink>
                  </MenuList>
                </MenuPopover>
              </Menu>
            ) : (
              <Link href="/api/auth/login">
                <Button appearance="subtle">Login</Button>
              </Link>
            )}
            </div>
            </div>
          </div>
        </div>
      </FluentProvider>
    </>
  );
};

export { Navbar };
