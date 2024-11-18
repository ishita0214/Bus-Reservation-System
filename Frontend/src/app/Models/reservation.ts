
export class Reservation {
    id?: number; 
    userId: number; 
    bus_id: number; 
    reservationDate: string; 
    seatNumber: number; 
    bookingId:number;
    
    constructor(
       
        userId: number,
        bus_id: number = 0,
        reservationDate: string='' ,
        seatNumber: number = 0,
        bookingId:number=0,
        id?: number
        
    ) {
        this.id = id;
        this.userId = userId;
        this.bus_id = bus_id;
        this.reservationDate = reservationDate;
        this.seatNumber = seatNumber;
        this.bookingId=bookingId;
       
  
    }

    // You can add methods here if needed
}