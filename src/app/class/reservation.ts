import {Room} from "./room";

export class Reservation {
  constructor(public price: number,public date: Date,public rooms: Room[], public halfed?: boolean, public userId?: string | null, public complete?: boolean,public id?: number) {
  }
}
