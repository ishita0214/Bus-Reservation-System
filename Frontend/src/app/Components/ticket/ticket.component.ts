import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../Models/reservation';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Services/ticket.service';
import { Ticket } from '../../Models/ticket';
import { ReservationService } from '../../Services/reservation.service';
import { Booking } from '../../Models/bookings';
import { Details } from '../../Models/details';
interface TicketDetail {
  seatNumber: number;
  name: string;
  age: number;
  gender: string;
  stateOfResidence: string;
  contactDetails: string;
}

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'], 
})

export class TicketComponent implements OnInit {
 
  busData!: any;
  routeData!: any;
  tickets: Ticket[] = [];
  reservations: Reservation[] = [];
  ticketDetails: TicketDetail[] = [];
  totalFare!: number;
  booking!:Booking;
  seatNumber!:number[]

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private reservationService:ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationService.currentReservation$.subscribe({
      next: (reservations) => {        
        this.reservations = reservations;
        this.buildTicketDetails();
      },
      error: (error) => {
        console.error('Error fetching reservations: ' + error);
      }
    });

    this.ticketService.currentTicket$.subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.buildTicketDetails();
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.ticketService.booking.subscribe({
      next: (booking) => {
        this.booking = booking;
        console.log(this.booking);
        
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.ticketService.seatNumber.subscribe({
      next: (seatNumber) => {
        this.seatNumber = seatNumber;
        console.log(this.seatNumber);
        
      },
      error: (error) => {
        console.log(error);
      }
    });


    this.ticketService.currentBusData$.subscribe({    
      next: (busData) => {
        this.busData = busData;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.ticketService.currentRoute$.subscribe({
      next: (routeData) => {
        this.routeData = routeData;    
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.ticketService.totalFare$.subscribe((fare) => {
      this.totalFare = fare;
    });
  }

  buildTicketDetails() {
    if (this.tickets.length && this.reservations.length) {
      this.ticketDetails = this.tickets.map((ticket, index) => ({
        seatNumber: this.reservations[index]?.seatNumber,
        name: ticket.name,
        age: ticket.age,
        gender: ticket.gender,
        stateOfResidence: ticket.stateOfResidence,
        contactDetails: ticket.contactDetails
      }));
    }
  }
}