import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./components/not-found/not-found/not-found.component";
import {RegisterComponent} from "./components/register/register/register.component";
import {UserComponent} from "./components/user/user/user.component";
import {ReservationComponent} from "./components/reservation/reservation/reservation.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'signUp', component: RegisterComponent},
  { path: 'account', component: UserComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
