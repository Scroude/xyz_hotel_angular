import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reservation} from "../class/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  getReservation(userId: string): Observable<Reservation[]> {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.http.get<Reservation[]>("/api/reservation/"+userId+"/all", {params : params});
  }

  postReservation(reservation : Reservation): Observable<boolean> {
    return this.http.post<boolean>("/api/reservation/add", reservation);
  }

  updateReservation(reservationId: number | undefined): Observable<boolean> {
    // @ts-ignore
      return this.http.put<boolean>("/api/reservation/"+reservationId+"/update");
  }

  cancelReservation(reservationId: number | undefined): Observable<boolean> {
    // @ts-ignore
    return this.http.put<boolean>("/api/reservation/"+reservationId+"/cancel");
  }
}
