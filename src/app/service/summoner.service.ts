import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Summoner} from "../models/summoner.model";
import {Match} from "../models/match.model";

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  constructor(private httpClient: HttpClient) { }

  getSummonerByName(summonerName: string) {
    const requestSummonerByName : string = environment.apiBaseUrl + "summoner/" + summonerName;
    return this.httpClient.get<Summoner>(requestSummonerByName)
  }

  getAllMatchsId(puuid: string) {
    const requestMatchesByPuuid : string = environment.apiBaseUrl + "summoner/" + puuid + "/matches"
    return this.httpClient.get(requestMatchesByPuuid)
  }

  getMatchInfoById(id : string) {
    const requestMatchById : string = environment.apiBaseUrl + "matches/" + id;
    return this.httpClient.get<Match>(requestMatchById);
  }
}
