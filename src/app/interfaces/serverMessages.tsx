export enum MessageTypes {
  playerReady = "playerReady",
  startGame = "startGame",
}

export interface PlayerReadyMessageData {
  playerReady: boolean;
}
