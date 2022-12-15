import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Summoner} from "../models/summoner.model";

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  constructor(private httpClient: HttpClient) { }

  getSummonerByName(summonerName: string) {
    const requestSummonerByName : string = environment.apiBaseUrl + "summoner/" + summonerName;
    return this.httpClient.get<Summoner>(requestSummonerByName)
  }
}
