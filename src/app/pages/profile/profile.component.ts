import { Component, OnInit } from '@angular/core';
import {SummonerService} from "../../service/summoner.service";
import {Summoner} from "../../models/summoner.model";
import {ActivatedRoute} from "@angular/router";
import {Match} from "../../models/match.model";
import {catchError} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  rankTier : String;
  lp : Number;
  imgPath: String;
  summoner : Summoner | null;
  matchesId : any
  matches: Array<Match>
  notFound: boolean
  errorMessage: string;
  constructor(private summonerService : SummonerService, private route: ActivatedRoute) {
    this.rankTier = "";
    this.lp = 0;
    this.imgPath="https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1670665277508";
    this.matchesId = []
    this.matches = []
    this.summoner = null;
    this.notFound = false
    this.errorMessage = ""
  }
  ngOnInit(): void {
    const name: string = this.route.snapshot.params['name'];
    this.summonerService.getSummonerByName(name).pipe(
      catchError(err => {
          this.errorMessage = "Le profil du summoner " + name +" n'existe pas !";
          console.log(err)
        return [];
      })
    )
      .subscribe(summoner => {
      this.summoner = summoner
      this.rankTier = this.summoner.tier + " " + this.summoner.rank
      this.lp = this.summoner.leaguePoints
      this.summonerService.getAllMatchsId(this.summoner.puuid).subscribe(matches => {
        this.matchesId = matches;
        this.matchesId.forEach((matchId : string) => {
          this.summonerService.getMatchInfoById(matchId).subscribe(match => {
            this.matches.push(match)
          })
        })
      })
    })
  }

}
