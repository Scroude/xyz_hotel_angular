import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private router : Router) {}

  postUser(user : User): Observable<boolean> {
    return this.http.post<boolean>("/api/user/register", user);
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
