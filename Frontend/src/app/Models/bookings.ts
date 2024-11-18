export class Passenger {
  constructor(
    public name: string,
    public age: number,
    public gender: string,
    public stateOfResidence: string,
    public contactDetails: string
  ) {}
}
export class Booking {
    bookingId: number;
    source: string;
    destination: string;
    arrTime: string;
    deptTime: string;
    reservationDate: string;
    operator:string;
    busNumber:string;
    passengers: Passenger[];
    
   
    constructor(
        bookingId: number,
        source: string,
        destination: string,
        arrTime: string,
        deptTime: string,
        reservationDate: string,
        operator:string,
        busNumber:string='',
        passengers: Passenger[] = []
    ) {
      
      this.arrTime = arrTime;
      this.deptTime = deptTime;
     
      this.bookingId = bookingId;
      this.source=source;
      this.destination=destination;
      this.reservationDate=reservationDate;
      this.operator=operator;
      this.busNumber=busNumber;
      this.passengers = passengers; 
    }
  }
  