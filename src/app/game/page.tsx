"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { fetcher } from "../services/fetcher";
import { useEffect } from "react";

const getNewGameCode = async () => {
  const res = await fetcher("/game-code/new", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Unable to get new game code");
  }
  const response: NewGameCodeGET = await res.json();
  return response.gameCode;
};

export default function CreateGame() {
  const { user, error: loginError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loginError || !user) {
      // add toast or some log
      router.push("/api/auth/login");
      // where will this redirect after login flow ends? I think to just /
      return;
    }

    if (user) {
      getNewGameCode().then((gameCode) => {
        console.log(gameCode);
      });
    }
  }, []);

  // return loading spinner here
  return;
}
