import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../class/reservation";
import {User} from "../class/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId: string | null | undefined): Observable<User> {
    return this.http.get<User>("/api/user/"+userId);
  }

  putUser(user: User): Observable<boolean> {
    return this.http.put<boolean>("/api/user/update", user);
  }

  deleteUser(userId: string): Observable<boolean> {
    return this.http.delete<boolean>("/api/user/"+userId+"/delete");
  }

  putUserPassword(user: User) {
      return this.http.put<boolean>("/api/user/updatePassword", user);
  }
}
