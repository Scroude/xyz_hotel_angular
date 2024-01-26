import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../class/wallet";
import {Payment} from "../class/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  postPayment(payment : Payment): Observable<boolean> {
    return this.http.post<boolean>("/api/payment/add", payment);
  }
}
