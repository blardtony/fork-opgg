import { Component, OnInit } from '@angular/core';
import {SummonerService} from "../../service/summoner.service";
import {Summoner} from "../../models/summoner.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  rankTier : String;
  lp : Number;
  imgPath: String;
  summoner : Summoner | undefined;
  constructor(private summonerService : SummonerService, private route: ActivatedRoute) {
    this.rankTier = "";
    this.lp = 0;
    this.imgPath="https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1670665277508";
  }
  ngOnInit(): void {
    const name : string = this.route.snapshot.params['name'];
    this.summonerService.getSummonerByName(name).subscribe(summoner => {
      this.summoner = summoner
      this.rankTier = this.summoner.tier + " " + this.summoner.rank
      this.lp = this.summoner.leaguePoints
    })
  }

}
