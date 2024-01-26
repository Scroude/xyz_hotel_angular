import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReservationService} from "../../../services/reservation.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../class/user";
import {Wallet} from "../../../class/wallet";
import {WalletService} from "../../../services/wallet.service";
import {Currency} from "../../../class/currency";
import {PaymentService} from "../../../services/payment.service";
import {Payment} from "../../../class/payment";
import {CurrencyService} from "../../../services/currency.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
    userId?: string | null;
    userGet = new User("", "", this.userId, "", "", "", "");
    walletGet = new Wallet();
    editingUser = false;
    editingPassword = false;
    editingAddMoney = false;
    currenciesGet: Currency[] = [];
    paymentAmount = 0;
    selectedCurrency: Currency = new Currency();

    constructor(private router: Router,
                private userService: UserService,
                private walletService: WalletService,
                private paymentService: PaymentService,
                private currencyService: CurrencyService) {
    }

    ngOnInit(): void {
        this.userId = this.readLocalStorageValue("userId");
        if (this.userId !== null) {
            this.loadUser(this.userId);
            this.loadWallet(this.userId);
            this.loadCurrencies();
        } else {
            this.navigateToLogin();
        }
    }

    private readLocalStorageValue(key: string) {
        return localStorage.getItem(key);
    }

    private navigateToLogin() {
        this.router.navigateByUrl('/login');
    }

    private loadUser(userId: string | undefined) {
        this.userService
            .getUser(userId)
            .subscribe((user) => {
                this.userGet = user;
            });
    }

    private loadWallet(userId: string | undefined) {
        this.walletService
            .getWallet(userId)
            .subscribe((wallet) => {
                this.walletGet = wallet;
            });
    }

    disconnectUser() {
        localStorage.removeItem("userId");
        this.router.navigateByUrl('/login');
    }

    editUser() {
        this.editingUser = true;
    }

    editPassword() {
        this.editingPassword = true;
    }

    saveChanges() {
        this.userService
            .putUser(new User(this.userGet.email, "", this.userId, this.userGet.firstName, this.userGet.lastName, this.userGet.phone))
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadUser(this.userId);
                }
            });
        this.editingUser = false;
    }

    savePassword() {
        this.userService
            .putUserPassword(new User("", this.userGet.password, this.userId, "", "", "", this.userGet.newPassword))
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadUser(this.userId);
                }
            });
        this.editingPassword = false;
    }

    cancelUserEdit() {
        this.editingUser = false;
    }

    cancelPasswordEdit() {
        this.editingPassword = false;
    }

    editAddMoney() {
        this.editingAddMoney = true
    }

    cancelAddMoneyEdit() {
        this.editingAddMoney = false;
    }

    addMoneyWallet() {
        this.paymentService
            .postPayment(new Payment(this.walletGet.id, this.paymentAmount, this.selectedCurrency.id))
            .subscribe(response => {
                if (response && this.userId !== null && this.userId !== undefined) {
                    this.loadWallet(this.userId);
                }
            });
        this.editingAddMoney = false
    }

    private loadCurrencies() {
        this.currencyService
            .getCurrencies()
            .subscribe((currencies) => {
                this.currenciesGet = currencies;
            });
    }
}
