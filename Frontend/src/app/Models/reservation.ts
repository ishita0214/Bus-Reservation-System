export class Reservation {
    id?: number; // Optional for creating new reservations
    user_id: number; // User ID associated with the reservation
    bus_id: number; // Bus ID associated with the reservation
    reservationDate: string; // Date and time of reservation
    seatNumber: number; // Seat number reserved

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