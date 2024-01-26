import {Wallet} from "./wallet";
import {Currency} from "./currency";

export class Payment {
  constructor(public walletId: number | undefined, public amount: number, public currencyId: number | undefined, public reservationId?: number) {
  }
}
