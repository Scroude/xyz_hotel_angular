import { Component, OnInit } from '@angular/core';
import {User} from "../../../class/user";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email = "";
  password = "";
  userId?: string | null;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.userId = this.readLocalStorageValue("userId");
  }

  connectUser() {
    this.loginService
      .postUser(new User(this.email, this.password))
      .subscribe((userId : string) => {
        if (userId !== undefined) {
          localStorage.setItem("userId", String(userId));
          this.loginService.navigateToReservation();
        }
      });
  }

  readLocalStorageValue(key : string) {
    return localStorage.getItem(key);
  }
}
