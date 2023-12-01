"use client";

import styles from "../page.module.css";
import {
  Avatar,
  Button,
  FluentProvider,
  Image,
  LargeTitle,
  Text,
  Title1,
  Title2,
  teamsLightTheme,
} from "@fluentui/react-components";

const Navbar = () => {
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
      </FluentProvider>
    </>
  );
};

export { Navbar };
