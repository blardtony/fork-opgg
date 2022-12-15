import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() tier: String;
  @Input() lp: Number;
  @Input() imgPath : String;
  constructor() {
    this.tier="";
    this.lp = 0;
    this.imgPath = "";
  }
  ngOnInit(): void {
  }

}
