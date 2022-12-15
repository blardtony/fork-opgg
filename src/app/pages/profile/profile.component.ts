import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tier : String;
  lp : Number;
  imgPath: String;
  constructor() {
    this.tier = "Silver 4";
    this.lp = 15;
    this.imgPath="https://opgg-static.akamaized.net/images/medals_new/silver.png?image=q_auto,f_webp,w_144&v=1670665277508";
  }
  ngOnInit(): void {
  }

}
