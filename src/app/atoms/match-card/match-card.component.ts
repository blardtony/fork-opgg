import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../models/match.model";

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {

  @Input()
  match: Match | undefined;
  constructor() {
  }

  ngOnInit(): void {
  }

  getTimeGameByDuration(gameDuration: number) {
    const totalMinutes = Math.floor(gameDuration / 60);

    const seconds = gameDuration % 60;

    return totalMinutes + "min" + seconds + "s";
  }

  getDate(gameCreation: number ) {
    const dateGame :Date = new Date(gameCreation)
    return dateGame.getDate() + "/" + dateGame.getMonth() + "/" + dateGame.getFullYear()
  }
}
