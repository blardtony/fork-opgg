export class Summoner {
  constructor(
    public id: string,
    public accountId: string,
    public name: string,
    public profileIconId: number,
    public revisionDate: number,
    public summonerLevel: number,
    public rank: string,
    public tier: string
  ) {
  }
}
