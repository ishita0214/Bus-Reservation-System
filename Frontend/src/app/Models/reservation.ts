export class Reservation {
    id?: number; 
    user_id: number; 
    bus_id: number; 
    reservationDate: string; 
    seatNumber: number; 

    constructor(
        id?: number,
        user_id: number = 0,
        bus_id: number = 0,
        reservationDate: string='' ,
        seatNumber: number = 0
    ) {
        this.id = id;
        this.user_id = user_id;
        this.bus_id = bus_id;
        this.reservationDate = reservationDate;
        this.seatNumber = seatNumber;
    }

    // You can add methods here if needed
}