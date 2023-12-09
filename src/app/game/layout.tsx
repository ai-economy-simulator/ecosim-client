"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import {
  FluentProvider,
  Spinner,
  Toaster,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import { GameContext } from "./gameContext";
import * as Colyseus from "colyseus.js";
import { useEffect, useState } from "react";
import { GameContextData } from "../interfaces/contexts";
import CustomUseUser from "../components/customUseUser";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error: loginError, isLoading: authLoading } = CustomUseUser();
  const router = useRouter();
  const [gameContext, setGameContext] = useState<GameContextData>({
    client: undefined,
    room: undefined,
    gameCode: undefined,
  });

  useEffect(() => {
    if (user) {
      const client = new Colyseus.Client(
        process.env.NEXT_PUBLIC_GAMESERVER_URL,
      );
      setGameContext({ ...gameContext, client: client });
    }
  }, [user]);

  // This will ensure that all nested routes are auth protected
  if (authLoading) {
    return (
      <FluentProvider theme={teamsLightTheme}>
        <Spinner />
      </FluentProvider>
    );
  }

  if (loginError || !user) {
    // add toast or some log
    router.push("/api/auth/login");
    // where will this redirect after login flow ends? I think to just /
    return;
  }

  if (user) {
    return (
      <FluentProvider theme={teamsLightTheme}>
        <Toaster toasterId="toaster" />
        <GameContext.Provider value={{ gameContext, setGameContext }}>
          {children}
        </GameContext.Provider>
      </FluentProvider>
    );
  }
  return;
}
