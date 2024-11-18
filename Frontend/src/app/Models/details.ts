export class Details{
    id: number;
    reservation_id: number;
    name: string;
    age: number;
    gender: string;
    stateOfResidence: string;
    contactDetails: string;
    seatNumber:number;
    selected?: boolean;
    
    constructor(
      name: string='',
      age: number=0,
      gender: string='',
      state_of_residence: string='',
      contact_details: string='',
      seatNumber:number=0,
      id: number,
      reservation_id: number,
      selected?: boolean
    ) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.stateOfResidence = state_of_residence;
      this.contactDetails = contact_details;
      this.id = id; // Optional
      this.reservation_id = reservation_id;
      this.seatNumber=seatNumber; 
      this.selected=selected;
    }
}