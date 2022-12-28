export class Match {
  constructor(
    public matchId: string,
    public gameCreation: number,
    public gameDuration: number,
    public gameEndTimestamp: number,
    public gameId: number,
    public gameMode: string,
    public gameName: string,
    public gameType: string
  ) {
  }
}
