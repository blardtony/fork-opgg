import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../models/match.model";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  constructor() {
    this.matches = []
  }
  @Input()
  matches: Array<Match>;
  ngOnInit(): void {
  }



}
