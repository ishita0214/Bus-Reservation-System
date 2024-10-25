export class Ticket {
    id?: number;
    reservation_id?: number;
    name: string;
    age: number;
    gender: string;
    stateOfResidence: string;
    contactDetails: string;
    
    constructor(
      name: string='',
      age: number=0,
      gender: string='',
      state_of_residence: string='',
      contact_details: string='',
      id?: number,
      reservation_id?: number
    ) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.stateOfResidence = state_of_residence;
      this.contactDetails = contact_details;
      this.id = id; // Optional
      this.reservation_id = reservation_id; // Optional
    }
  }
  