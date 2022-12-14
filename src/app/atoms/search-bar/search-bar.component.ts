import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  formNameSummoners = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor() { }

  onSubmit() {
    console.log(this.formNameSummoners.value.name);
  }

}
