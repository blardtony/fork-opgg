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
    this.filteredMatches = []
    this.asc = false
    this.filterBy = ""
  }
  @Input()
  matches: Array<Match>;
  filteredMatches: Array<Match>
  asc: boolean
  filterBy: string;
  ngOnInit(): void {
    this.filteredMatches = this.matches
  }


  orderByDate(asc: boolean) {
    this.asc = !asc
    if (asc) {
      return this.filteredMatches.sort((a, b) => {
        return new Date(a.gameCreation) < new Date(b.gameCreation) ? 1 : new Date(a.gameCreation) > new Date(b.gameCreation) ? -1 : 0
      })
    }
    return this.filteredMatches.sort((a, b) => {
      return new Date(a.gameCreation) > new Date(b.gameCreation) ? 1 : new Date(a.gameCreation) < new Date(b.gameCreation) ? -1 : 0
    })
  }

  filterByType() {
    this.filteredMatches = [...this.matches.filter(match => match.gameMode.toLowerCase().includes(this.filterBy.toLowerCase()))];
  }
}
