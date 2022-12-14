import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './atoms/search-bar/search-bar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileCardComponent } from './atoms/profile-card/profile-card.component';
import {SummonerService} from "./service/summoner.service";
import {HttpClientModule} from "@angular/common/http";
import { MatchCardComponent } from './atoms/match-card/match-card.component';
import { MatchesComponent } from './component/matches/matches.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    ProfileComponent,
    ProfileCardComponent,
    MatchCardComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SummonerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
