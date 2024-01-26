import { Component, OnInit } from '@angular/core';
import {Router,} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userId?: string | null;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.userId = this.readLocalStorageValue("userId");
  }

  readLocalStorageValue(key : string) {
    return localStorage.getItem(key);
  }

  disconnectUser() {
    localStorage.removeItem("userId");
    this.router.navigateByUrl('/signIn');
  }

}
