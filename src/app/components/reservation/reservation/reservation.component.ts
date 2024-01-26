import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReservationService} from "../../../services/reservation.service";
import {Reservation} from "../../../class/reservation";
import {Room} from "../../../class/room";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
    userId?: string | null;

    selectedRoomType = 'STANDARD';
    selectedRoomCount = 1;

    reservationsGet: Reservation[] = [];
    reservation = new Reservation(0, new Date(), [], false, this.userId);
    todaysDate = new Date();


    constructor(private router: Router, private reservationService: ReservationService) {
    }

    ngOnInit(): void {
        this.userId = this.readLocalStorageValue("userId");
        if (this.userId !== null) {
            this.loadReservation(this.userId);
        } else {
            this.navigateToLogin();
        }
    }

    navigateToLogin() {
        this.router.navigateByUrl('/login');
    }

    readLocalStorageValue(key: string) {
        return localStorage.getItem(key);
    }


    addRoom() {
        var roomType = Room.STANDARD;
        var roomCount = this.selectedRoomCount;

        var price;
        switch (this.selectedRoomType) {
            case 'STANDARD':
                roomType = Room.STANDARD;
                price = 50;
                break;
            case 'SUPERIOR':
                roomType = Room.SUPERIOR;
                price = 100;
                break;
            case 'SUITE':
                roomType = Room.SUITE;
                price = 200;
                break;
            default:
                price = 0;
        }

        for (let i = 0; i < roomCount; i++) {
            this.reservation.rooms.push(roomType);
        }
        this.reservation.price += price * roomCount;
    };

    makeReservation() {
        // Ajouter la réservation à la liste
        this.reservationService
            .postReservation(this.reservation)
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadReservation(this.userId);
                }
            })

        // Réinitialiser le formulaire
        this.reservation = new Reservation(0, new Date(), [], false, this.userId)

        this.selectedRoomType = 'STANDARD';
        this.selectedRoomCount = 1;
    };

    disconnectUser() {
        localStorage.removeItem("userId");
        this.router.navigateByUrl('/login');
    }

    private loadReservation(userId: string) {
        this.reservationService
            .getReservation(userId)
            .subscribe((reservations) => {
                this.reservationsGet = reservations;
            });
    }

    confirmReservation(reservationId: number | undefined) {
        this.reservationService
            .updateReservation(reservationId)
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadReservation(this.userId);
                }
            })
    }

    cancelReservation(reservationId: number | undefined) {
        this.reservationService
            .cancelReservation(reservationId)
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadReservation(this.userId);
                }
            })
    }

    checkDate(date: Date, halfed: boolean | undefined, complete: undefined | boolean): boolean {
        date = new Date(date);
        date.setDate(date.getDate() + 1)
        if (typeof date === 'object' && 'getTime' in date) {
            if (halfed !== undefined) {
                if (complete !== undefined) {
                    return date.getTime() >= this.todaysDate.getTime() && halfed && !complete;
                } else {
                    return date.getTime() >= this.todaysDate.getTime() && halfed;
                }
            } else {
                return false
            }
        } else return true
    }
}
