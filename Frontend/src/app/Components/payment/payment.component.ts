import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SeatServiceService } from '../../Services/seat-service.service';
import { ReservationService } from '../../Services/reservation.service';
import { Reservation } from '../../Models/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../Models/bus';
import { BusService } from '../../Services/bus.service';
import { RouteService } from '../../Services/route.service';
import { Route } from '../../Models/route.model';
import { TicketService } from '../../Services/ticket.service';
import { Ticket } from '../../Models/ticket';
import { forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentOptions = [
    { id: 1, name: 'Credit Card', details: ['Card Number', 'CVV'] },
    { id: 2, name: 'Debit Card', details: ['Card Number', 'CVV'] },
    { id: 3, name: 'PayPal', details: ['UPI ID'] },
    { id: 4, name: 'Google Pay', details: ['UPI ID'] },
    { id: 5, name: 'Apple Pay', details: ['Apple ID'] },
    { id: 6, name: 'Bank Transfer', details: ['Account Number', 'IFSC Code'] },
    { id: 7, name: 'Cryptocurrency', details: ['Wallet Address'] }
  ];

  currBusId!: number;
  currBus!: Bus;
  busroute!: Route;
  date!: string;
  seatsData: number[] = [];
  selectedPaymentMethodId: number | null = null;
  currUser = Number(localStorage.getItem('loginUser'));
  bookingId!: number;
  passengers: any[] = [];
  state!: string;
  contact!: string
  reservationId: number[] = []
  ticketSaved: boolean = false
  tosave: boolean = false
  constructor(
    private seatService: SeatServiceService,
    private routeService: RouteService,
    private busService: BusService,
    private ticketService: TicketService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSeats();
    this.route.params.subscribe((data) => {
      this.currBusId = +data['id'];
      this.getCurrentBus();
    });

    this.seatService.date.subscribe((dateString) => {
      this.date = dateString;
    });
    this.ticketService.passengers.subscribe((data) => {
      if (data && Array.isArray(data)) {
        this.passengers = data; // Ensure it's an array
      } else {
        this.passengers = []; // Default to empty array if not valid
      }
      console.log(this.passengers);
    });
    this.ticketService.contact.subscribe((data) => {
      this.contact = data
    });
    this.ticketService.state.subscribe((data) => {
      this.state = data
    });
    console.log(this.currUser);

  }

  selectPaymentMethod(id: number) {
    this.selectedPaymentMethodId = this.selectedPaymentMethodId === id ? null : id;
  }

  payNow() {
    const selectedOption = this.paymentOptions.find(option => option.id === this.selectedPaymentMethodId);

    if (selectedOption) {
      this.bookingId = Math.floor(Math.random() * 90000) + 10000;

      // Create an array to hold reservations
      const reservations: Reservation[] = [];

      this.seatsData.forEach(element => {
        const reservation = new Reservation(1);
        reservation.bus_id = this.currBusId;
        reservation.reservationDate = this.date;
        reservation.seatNumber = element;
        reservation.bookingId = this.bookingId;
console.log(reservation);

        reservations.push(reservation); // Store each reservation
      });

      // Create an array of observables
      const reservationObservables = reservations.map(reservation => this.book(reservation));

      // Use forkJoin to wait for all reservations to complete
      forkJoin(reservationObservables).subscribe({
        next: () => {
          // All reservations are successful, now add passengers
          this.addPassengers();
          alert(`Proceeding to pay with ${selectedOption.name}`);
        },
        error: (err) => {
          console.error('Error during booking:', err);
        }
      });
    }
  }

  book(reservation: Reservation) {
    return this.reservationService.createTicket(reservation).pipe(
      tap((newReservation) => {
        if (newReservation && newReservation.id) {
          this.reservationId.push(newReservation.id); // Store reservation ID
          console.log('Reservation ID:', this.reservationId);
        } else {
          console.error('New reservation does not have an ID:', newReservation);
        }
      }),
      catchError((error) => {
        console.error('Error creating reservation:', error);
        return of(null); // Return a null observable in case of error
      })
    );
  }

  getSeats() {
    this.seatService.seatSelected.subscribe((data: number[]) => {
      this.seatsData = data;

    });
  }



  getCurrentBus() {
    this.busService.getBus(this.currBusId).subscribe((data: Bus) => {
      this.currBus = data;
      this.getRoute();
    }, error => {
      console.error('Error fetching bus:', error);
    });
  }

  getRoute() {
    if (this.currBus && this.currBus.route_id) {
      this.routeService.getRouteById(this.currBus.route_id).subscribe((data: any) => {
        this.busroute = data;
      }, error => {
        console.error('Error fetching route:', error);
      });
    } else {
      console.error('Current bus or route ID is undefined');
    }
  }
  index: number = 0

  addPassengers() {
    this.passengers.forEach((data) => {
      const ticket = new Ticket();
      ticket.name = data.name;
      ticket.age = data.age;
      ticket.gender = data.gender;
      ticket.stateOfResidence = this.state; // Assuming state is set elsewhere
      ticket.contactDetails = this.contact; // Assuming contact is set elsewhere

      ticket.reservation_id = this.reservationId[this.index]
      this.index++
   

      this.ticketService.saveTicket(ticket).subscribe(() => {


      });





      // Here you would typically save or process the ticket
      // Example: this.ticketService.saveTicket(ticket).subscribe(...);
    });

  }

}