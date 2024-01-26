import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routes";
import {NotFoundComponent} from "./components/not-found/not-found/not-found.component";
import {ReservationComponent} from "./components/reservation/reservation/reservation.component";
import {UserComponent} from "./components/user/user/user.component";
import {RegisterComponent} from "./components/register/register/register.component";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ReservationComponent,
    UserComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
