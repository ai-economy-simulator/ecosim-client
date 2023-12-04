import { Dispatch, SetStateAction, createContext } from "react";
import { GameContextData } from "../interfaces/contexts";

// define type for GameContext
export const GameContext = createContext<{
  gameContext: GameContextData | undefined;
  setGameContext: Dispatch<SetStateAction<GameContextData>>;
}>({
  gameContext: undefined,
  setGameContext: () => {},
});
