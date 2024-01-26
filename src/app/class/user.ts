import {Wallet} from "./wallet";

export class User {
    constructor(public email: string, public password: string, public id?: string | null, public firstName?: string, public lastName?: string, public phone?: string, public newPassword?: string,) {
    }
}
