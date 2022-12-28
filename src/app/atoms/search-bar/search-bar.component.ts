import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  formNameSummoners = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  get name() { return this.formNameSummoners.get('name'); }
  onSubmit() {
    console.log(this.formNameSummoners.valid)
    if (this.formNameSummoners.valid) {
      console.log(this.name?.value)
      this.router.navigate(['/summoner/'+ this.name?.value]).then(res => console.log(res)).catch(e => console.log("error " + e))
    }
  }

}
