import {Component, OnInit} from '@angular/core';
import {User} from "../../../class/user";
import {RegisterService} from "../../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email = "";
  password = "";
  lastname = "";
  firstname = "";
  userId?: string | null;

  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {
    this.userId = this.readLocalStorageValue("userId");
  }

  addUser() {
    this.registerService
      .postUser(new User(this.email, this.password, "", this.firstname, this.lastname))
      .subscribe((bool : boolean) => {
        if (bool) {
          this.registerService.navigateToLogin();
        }
      });
  }

  readLocalStorageValue(key : string) {
    return localStorage.getItem(key);
  }
}
