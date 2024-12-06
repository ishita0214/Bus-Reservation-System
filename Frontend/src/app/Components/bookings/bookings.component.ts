import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../../Services/reservation.service';
import { CommonModule } from '@angular/common';
import { Booking, Passenger } from '../../Models/bookings';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule, 
    BadgeModule,
    AvatarModule,
    // BrowserAnimationsModule,
    ButtonModule
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  constructor(private reservationService:ReservationService){  this.getBookings();}
  ngOnInit(): void {
  
  }
  bookings:Booking[]=[]
  userId:any=localStorage.getItem('loginUser');
  route=inject(Router);
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];
  cancelledBookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  passengerDetails: Passenger[] = [];

  getBookings(){
    this.reservationService.getUserBookings(this.userId).subscribe((data)=>{
      this.bookings=data;
      this.categorizeBookings();

    })
  }
  categorizeBookings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    this.upcomingBookings = [];
    this.pastBookings = [];
    this.cancelledBookings = [];

    this.bookings.forEach(booking => {
      const reservationDate = new Date(booking.reservationDate);
      if (booking.status === 'CANCELLED') {
        this.cancelledBookings.push(booking);
      } else if (reservationDate >= today) {
        this.upcomingBookings.push(booking);
      } else {
        this.pastBookings.push(booking);
      }
    });
  }
currPage:string=''
  onClick(bookingId: number, booking: Booking,currPage:string) {
    
    // Check if booking and passengers are defined
    if (booking) {
      this.currPage=currPage;
      this.reservationService.currPage.next(this.currPage);
      this.route.navigateByUrl('details/' + bookingId);
      this.reservationService.tickets.next(booking);
    } else {
      console.error('Booking or passengers data is undefined:', booking);
    }
  }

 


}
