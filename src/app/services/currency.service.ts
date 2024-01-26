import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "../class/currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>("/api/currency/all");
  }
}
