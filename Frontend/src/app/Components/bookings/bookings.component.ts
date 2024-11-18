import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../../Services/reservation.service';
import { CommonModule } from '@angular/common';
import { Booking } from '../../Models/bookings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  constructor(private reservationService:ReservationService){  this.getBookings();}
  ngOnInit(): void {
  
  }
  bookings:Booking[]=[]
  userId:any=localStorage.getItem('loginUser');
  route=inject(Router)

  getBookings(){
    this.reservationService.getUserBookings(this.userId).subscribe((data)=>{
      this.bookings=data;
      console.log(this.bookings);
    })
  }
  onClick(bookingId:number,booking:Booking){
    this.route.navigateByUrl('details/'+bookingId);
    this.reservationService.tickets.next(booking);

  }

 


}
