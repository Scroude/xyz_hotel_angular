import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Wallet} from "../class/wallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallet(userId: string | null | undefined): Observable<Wallet> {
    return this.http.get<Wallet>("/api/wallet/"+userId);
  }
}
