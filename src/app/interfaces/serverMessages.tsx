export enum MessageTypes {
  playerReady = "playerReady",
  startGame = "startGame",
  setGameAdmin = "setGameAdmin",
}

export interface PlayerReadyMessageData {
  playerReady: boolean;
}

export interface SetGameAdminMessageData {
  playerID: string;
}
