"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { fetcher } from "../services/fetcher";
import { useEffect, useState } from "react";
import { Spinner } from "@fluentui/react-components";

const getNewGameCode = async () => {
  const res = await fetcher("/game-code/new", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Unable to get new game code");
  }
  const response: NewGameCodeGET = await res.json();
  return response.gameCode;
};

export default function CreateGame() {
  const router = useRouter();

  getNewGameCode()
    .then((gameCode) => {
      router.push(`/game/${gameCode}`);
    })
    .catch((err) => {
      // see how to use Next.js errors
      console.error(err);
    });

  // return loading spinner here
  return;
}
