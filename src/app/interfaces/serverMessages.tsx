export enum MessageTypes {
  playerReady = "playerReady",
  startGame = "startGame",
  setGameAdmin = "setGameAdmin",
  endTurn = "endTurn",
}

export interface PlayerReadyMessageData {
  playerReady: boolean;
}

export interface StartGameMessageData {
  startGame: true;
}

export interface SetGameAdminMessageData {
  playerID: string;
}

export interface EndTurnMessageData {
  endTurn: true;
}
