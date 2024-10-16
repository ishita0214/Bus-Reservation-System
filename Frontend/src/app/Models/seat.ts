export class Seats {
    id?: number;
    user_id: number;
    bus_id: number;
    seat_number: number;
    reservation_date: string;  // You can store this as a string or Date
 
    
    constructor(
      user_id: number,
      bus_id: number,
      seat_number: number,
      reservation_date: string,
      id?: number
      
    ) {
      this.user_id = user_id;
      this.bus_id = bus_id;
      this.seat_number = seat_number;
      this.reservation_date = reservation_date;
      this.id = id;
    
    }
  }
  
  
  