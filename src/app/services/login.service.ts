import { Injectable } from '@angular/core';
import {User} from "../class/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router : Router) {  }

  postUser(user : User): Observable<string> {
    return this.http.post<string>("/api/user/login", user);
  }

  navigateToReservation() {
    this.router.navigateByUrl('/reservation');
  }
}
